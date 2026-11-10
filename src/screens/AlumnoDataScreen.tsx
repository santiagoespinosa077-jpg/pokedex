import { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, RefreshControl} from 'react-native';
import { useAlumnoDataResponse } from '../hooks/useAlumnoDataReponse';
import { BarChart } from 'react-native-gifted-charts';
import { appTheme } from '../theme/appTheme';

const C = {
  fondo: '#0f172a',
  tarjeta: '#1e293b',
  borde: '#334155',
  texto: '#f1f5f9',
  suave: '#94a3b8',
  frio: '#38bdf8',
  calor: '#f87171',
  top: '#fb923c',
  verde: '#34d399', 
  morado: '#a78bfa',
};

export const AlumnoDataScreen = () => {
  const { isLoading, data, loadData } = useAlumnoDataResponse();

  type Fecha = Date | string;
  type Punto = { value: number, label: string };

  // La fecha de nacimiento no lleva hora, se lee en UTC para que no se recorra un día
  const fecha = (f: Fecha) => {
    const d = new Date(f);
    return `${d.getUTCDate()}/${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;
  }

  const estiloEjes = {
    xAxisLabelTextStyle: { color: C.suave, fontSize: 10 }, 
    yAxisTextStyle: { color: C.suave, fontSize: 10 },
    xAxisColor: C.borde,
    yAxisColor: C.borde,
    rulesColor: C.borde,
    noOfSections: 4,
    isAnimated: true,
  };

  const Tarjeta = ({ titulo, subtitulo, children }: {
    titulo: string;
    subtitulo: string;
    children: ReactNode;
  }) => {
    return (
      <View
        style={ style.tarjeta }
      >
        <Text
          style={ style.titulo }
        >
          { titulo }
        </Text>
        <Text
          style={ style.sub }
        >
          { subtitulo }
        </Text>
        <View
          style={{ marginTop: 16 }}
        >
          { children }
        </View>
      </View>
    );
  }

  const Stat = ({ label, valor, color, decimales = 1 }: {
    label: string;
    valor: number;
    color: string;
    decimales?: number;
  }) => {
    return ( 
      <View
        style={{
          ...style.stat,
          borderTopColor: color
        }}
      >
        <Text
          style={ style.sub }
        >
          { label }
        </Text>
        <Text
          style={{
            ...style.statValor,
            backgroundColor: color
          }}
        >
          { Number(valor).toFixed(decimales) } 
        </Text>
      </View>
    );
  }

  const GraficoBarras = ({ datos, color }: { datos: Punto[]; color: string }) => {

    const { width } = useWindowDimensions();

    return (
      <BarChart
        {...estiloEjes}
        data={datos}
        frontColor={color}
        width={width - 122}
        barWidth={26}
        spacing={22}
        initialSpacing={10}
        roundedTop
      />
    );
  };

  if(!data){
    return( 
      <View
        style={ appTheme.container }
      >
        <Text
          style={ appTheme.text }
        >
          Cargando...
        </Text>
      </View>
    );
  }

  const { total, activos, promedioGeneral }= data;

  const promedioGrupo = [...data.promedio_Por_Grado_Y_Grupo]
    .sort((a, b) => Number(a.grado) - Number(b.grado) || a.grupo.localeCompare(b.grupo))
    .map(p => ({
      value: Number(p.promedio_por_grado_y_grupo),
      label: `${p.grado}${p.grupo}`,
    }));

  const mejores = data.mejoresPromedios.map(m => ({
    value: Number(m.promedio),
    label: m.nombre,
  }));

  const menores = data.promedioMenor.map(a => ({
    value: Number(a.promedio),
    label: a.nombre,
  }));

  return(
    <ScrollView
      scrollEnabled={ true }
      style={ style.pantalla }
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadData}
          tintColor={C.frio}
          colors={[C.frio]}
          progressBackgroundColor={C.tarjeta}
        />
      }
    >
      <View>
        <Text style={style.header}>Monitor de alumnos</Text>
        <Text style={style.sub}>{total} alumnos registrados</Text>
      </View>

      <View style={style.fila}>
        <Stat label="Activos" valor={activos} color={C.verde} decimales={0} />
        <Stat label="Promedio general" valor={promedioGeneral.promedio_general} color={C.frio} />
        <Stat label="Sobre su grado" valor={data.promedioMayorGrado.length} color={C.morado} decimales={0} />
      </View>

      <Tarjeta titulo="Promedio por grupo" subtitulo="Grado y grupo">
        <GraficoBarras datos={promedioGrupo} color={C.frio} />
      </Tarjeta>

      <Tarjeta titulo="Mejores promedios" subtitulo="Los 3 más altos">
        <GraficoBarras datos={mejores} color={C.verde} />
      </Tarjeta>

      <Tarjeta titulo="Promedio menor a 7" subtitulo="Alumnos con menor promedio">
        <GraficoBarras datos={menores} color={C.calor} />
      </Tarjeta>

      <Tarjeta titulo="Segundo grado" subtitulo="Ordenados por apellido">
        {data.segundoGrado.map((a, i) => (
          <View key={`${a.apellido}-${a.nombre}-${i}`} style={style.item}>
            <Text style={style.itemTexto}>{a.apellido}</Text>
            <Text style={style.itemSub}>{a.nombre}</Text>
          </View>
        ))}
      </Tarjeta>

      <Tarjeta titulo="Nacidos en 2012" subtitulo="Fecha de nacimiento">
        {data.nacidos2012.map(a => (
          <View key={a.id_alumno} style={style.item}>
            <Text style={style.itemTexto}>{a.nombre} {a.apellido}</Text>
            <Text style={style.itemSub}>{fecha(a.fecha_nacimiento)}</Text>
          </View>
        ))}
      </Tarjeta>

    </ScrollView> 
  );
}

const style = StyleSheet.create({
  pantalla: { flex:1, backgroundColor: C.fondo },
  centro: { justifyContent: 'center', alignItems: 'center' },
  header: { color: C.texto, fontSize: 13 },
  sub: { color: C.texto, fontSize: 26, fontWeight: "bold" },
  fila: { flexDirection: 'row', gap: 10, padding: 5 },
  stat: { flex: 1, backgroundColor: C.tarjeta, borderRadius: 12, borderTopWidth: 3, padding: 12 },
  statValor: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  tarjeta: {
    backgroundColor: C.tarjeta,
    borderColor: C.borde,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 16,
    marginBottom: 15
  },
  titulo: { color: C.texto, fontSize: 17, fontWeight: 'bold' },
  leyenda: { flexDirection: 'row', textAlign: 'center', gap: 6 },
  punto: { width: 10, height: 10, borderRadius: 5 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: C.borde
  },
  itemTexto: { color: C.texto, fontSize: 14 },
  itemSub: { color: C.suave, fontSize: 13 }
});