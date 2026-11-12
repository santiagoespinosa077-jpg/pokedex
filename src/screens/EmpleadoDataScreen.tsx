import { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, RefreshControl} from 'react-native';
import { useEmpleadoDataResponse } from '../hooks/useEmpleadoDataResponse';
import { BarChart } from 'react-native-gifted-charts';
import { appTheme } from '../theme/appTheme';

const C = {
  fondo: '#1a0f14',
  tarjeta: '#2a1820',
  borde: '#4a2a36',
  texto: '#fff1ec',
  suave: '#c4a0a8',
  frio: '#ffb38a',
  calor: '#ff6b81',
  top: '#ffd36e',
  verde: '#9be37d',
  morado: '#e0a3ff',
};

export const EmpleadoDataScreen = () => {
  const { isLoading, data, loadData } = useEmpleadoDataResponse();

  type Fecha = Date | string;
  type Punto = { value: number, label: string };

  const fecha = (f: Fecha) => {
    const d = new Date(f);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
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

  const { total, nomina } = data;

  const promedioDepto = [...data.promedioPorDepartamento]
    .sort((a, b) => Number(b.salario_promedio) - Number(a.salario_promedio))
    .slice(0, 10)
    .map(d => ({
      value: Number(d.salario_promedio),
      label: d.departamento.slice(0, 6),
    }));

  const empleadosDepto = [...data.promedioPorDepartamento]
    .sort((a, b) => Number(b.total_empleados) - Number(a.total_empleados))
    .slice(0, 10)
    .map(d => ({
      value: Number(d.total_empleados),
      label: d.departamento.slice(0, 6),
    }));

  const deptosBajos = [...data.departamentosSalarioBajo]
    .sort((a, b) => Number(a.salario_promedio) - Number(b.salario_promedio))
    .slice(0, 8)
    .map(d => ({
      value: Number(d.salario_promedio),
      label: d.departamento.slice(0, 6),
    }));

  const bajo = data.salarioMasBajo[0];

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
        <Text style={style.header}>Monitor de empleados</Text>
        <Text style={style.sub}>{total} empleados registrados</Text>
      </View>

      <View style={style.fila}>
        <Stat label="Departamentos" valor={data.promedioPorDepartamento.length} color={C.verde} decimales={0} />
        <Stat label="Nómina mensual" valor={Number(nomina.nomina_mensual)} color={C.morado} decimales={0} />
      </View>

      <Tarjeta titulo="Salario promedio" subtitulo="Los 10 departamentos mejor pagados">
        <GraficoBarras datos={promedioDepto} color={C.frio} />
      </Tarjeta>

      <Tarjeta titulo="Empleados por departamento" subtitulo="Los 10 departamentos con más empleados">
        <GraficoBarras datos={empleadosDepto} color={C.top} />
      </Tarjeta>

      <Tarjeta titulo="Promedio menor a 20000" subtitulo="Departamentos con salario promedio bajo">
        <GraficoBarras datos={deptosBajos} color={C.calor} />
      </Tarjeta>

      <Tarjeta titulo="Tecnología" subtitulo="Empleados de ese departamento">
        {data.tecnologia.map((e, i) => (
          <View key={`${e.nombre}-${i}`} style={style.item}>
            <Text style={style.itemTexto}>{e.nombre}</Text>
            <Text style={style.itemSub}>{e.departamento}</Text>
          </View>
        ))}
      </Tarjeta>

      <Tarjeta titulo="Contratados después de 2022" subtitulo="Los más recientes">
        {data.contratadosDespues2022.map(e => (
          <View key={e.id_empleado} style={style.item}>
            <Text style={style.itemTexto}>{e.nombre}</Text>
            <Text style={style.itemSub}>{fecha(e.fecha_contratacion)}</Text>
          </View>
        ))}
      </Tarjeta>

      {bajo && (
        <Tarjeta titulo="Salario más bajo" subtitulo="Empleado con el menor salario mensual">
          <View style={style.item}>
            <Text style={style.itemTexto}>{bajo.nombre}</Text>
            <Text style={style.itemSub}>${bajo.salario_mensual}</Text>
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