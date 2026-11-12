import { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, RefreshControl} from 'react-native';
import { useCalificacionDataResponse } from '../hooks/useCalificacionDataResponse';
import { BarChart } from 'react-native-gifted-charts';
import { appTheme } from '../theme/appTheme';

const C = {
  fondo: '#0e1116',
  tarjeta: '#171c24',
  borde: '#2a3340',
  texto: '#f3f4f6',
  suave: '#9aa4b2',
  frio: '#2dd4bf',
  calor: '#ff7a90',
  top: '#ffc857',
  verde: '#7bdc6c',
  morado: '#b79cff',
};

export const CalificacionDataScreen = () => {
  const { isLoading, data, loadData } = useCalificacionDataResponse();

  type Punto = { value: number, label: string };

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
          style={ style.subtitulo }
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
          style={ style.statLabel }
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

  const { total } = data;

  const porMateria = data.prom
    .slice(0, 10)
    .map(m => ({
      value: Number(m.promedio),
      label: `M${m.materia_id}`,
    }));

  const materiasBajas = [...data.materiasBajas]
    .sort((a, b) => Number(a.promedio) - Number(b.promedio))
    .slice(0, 10)
    .map(m => ({
      value: Number(m.promedio),
      label: `M${m.materia_id}`,
    }));

  const porAlumno = [...data.promAlum]
    .sort((a, b) => Number(b.promedio) - Number(a.promedio))
    .slice(0, 10)
    .map(a => ({
      value: Number(a.promedio),
      label: `A${a.alumno_id}`,
    }));

  const bimestre1 = data.bimestre
    .slice(0, 10)
    .map(b => ({
      value: Number(b.calificacion),
      label: `A${b.alumno_id}`,
    }));

  const mejor = data.mejor[0];

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
      <View style={style.encabezado}>
        <Text style={style.header}>Monitor de calificaciones</Text>
        <Text style={style.sub}>{total} calificaciones registradas</Text>
      </View>

      <View style={style.fila}>
        <Stat label="Materias" valor={data.prom.length} color={C.verde} decimales={0} />
        <Stat label="Alumnos" valor={data.promAlum.length} color={C.morado} decimales={0} />
      </View>

      <Tarjeta titulo="Promedio por materia" subtitulo="Las primeras 10 materias">
        <GraficoBarras datos={porMateria} color={C.frio} />
      </Tarjeta>

      <Tarjeta titulo="Materias bajo el promedio general" subtitulo="Las 10 con el promedio más bajo">
        <GraficoBarras datos={materiasBajas} color={C.calor} />
      </Tarjeta>

      <Tarjeta titulo="Promedio por alumno" subtitulo="Los 10 alumnos con mejor promedio">
        <GraficoBarras datos={porAlumno} color={C.top} />
      </Tarjeta>

      <Tarjeta titulo="Bimestre 1" subtitulo="Calificaciones de los primeros 10 registros">
        <GraficoBarras datos={bimestre1} color={C.morado} />
      </Tarjeta>

      <Tarjeta titulo="Calificaciones aprobatorias" subtitulo="7 o más, de menor a mayor">
        {data.calif.map(c => (
          <View key={c.id_calificacion} style={style.item}>
            <Text style={style.itemTexto}>Alumno {c.alumno_id} · Materia {c.materia_id}</Text>
            <Text style={style.itemSub}>{c.calificacion}</Text>
          </View>
        ))}
      </Tarjeta>

      {mejor && (
        <Tarjeta titulo="Mejor promedio" subtitulo="Alumno con el promedio más alto">
          <View style={style.item}>
            <Text style={style.itemTexto}>Alumno {mejor.alumno_id}</Text>
            <Text style={style.itemSub}>{Number(mejor.promedio).toFixed(2)}</Text>
          </View>
        </Tarjeta>
      )}

    </ScrollView> 
  );
}

const style = StyleSheet.create({
  pantalla: { flex:1, backgroundColor: C.fondo },
  centro: { justifyContent: 'center', alignItems: 'center' },
  encabezado: { marginBottom: 12 },
  header: { color: C.texto, fontSize: 26, fontWeight: 'bold' },
  sub: { color: C.suave, fontSize: 14, marginTop: 2 },
  fila: { flexDirection: 'row', gap: 10, paddingVertical: 5, marginBottom: 10 },
  stat: { flex: 1, backgroundColor: C.tarjeta, borderRadius: 12, borderTopWidth: 3, padding: 12 },
  statLabel: { color: C.suave, fontSize: 13 },
  statValor: {
    color: C.fondo,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden'
  },
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
  subtitulo: { color: C.suave, fontSize: 13, marginTop: 2 },
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