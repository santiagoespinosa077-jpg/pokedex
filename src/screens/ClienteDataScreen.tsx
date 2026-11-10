import { ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions, RefreshControl} from 'react-native';
import { useClienteDataResponse } from '../hooks/useClienteDataReponse';
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

export const ClienteDataScreen = () => {
  const { isLoading, data, loadData } = useClienteDataResponse();

  type Fecha = Date | string;
  type Punto = { value: number, label: string };

  const dia = (f: Fecha) => {
    const d = new Date(f);
    return `${d.getDate()}/${d.getMonth() + 1}`;
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

  const { total } = data;

  // Solo los 8 con más clientes, para que las etiquetas quepan
  const porEstado = [...data.estados]
    .sort((a, b) => Number(b.total) - Number(a.total))
    .slice(0, 8)
    .map(e => ({
      value: Number(e.total),
      label: e.estado.slice(0, 6),
    }));

  const porCiudad = [...data.uno]
    .sort((a, b) => Number(b.total) - Number(a.total))
    .slice(0, 8)
    .map(c => ({
      value: Number(c.total),
      label: c.ciudad.slice(0, 6),
    }));

  const ultimo = data.ultimo[0];

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
        <Text style={style.header}>Monitor de clientes</Text>
        <Text style={style.sub}>{total} clientes registrados</Text>
      </View>

      <View style={style.fila}>
        <Stat label="Estados" valor={data.estados.length} color={C.verde} decimales={0} />
        <Stat label="Ciudades con +1 cliente" valor={data.uno.length} color={C.morado} decimales={0} />
      </View>

      <Tarjeta titulo="Clientes por estado" subtitulo="Los 8 estados con más clientes">
        <GraficoBarras datos={porEstado} color={C.frio} />
      </Tarjeta>

      <Tarjeta titulo="Clientes por ciudad" subtitulo="Las 8 ciudades con más clientes">
        <GraficoBarras datos={porCiudad} color={C.top} />
      </Tarjeta>

      <Tarjeta titulo="Estado de México" subtitulo="Clientes que viven ahí">
        {data.estado.map(c => (
          <View key={c.id_cliente} style={style.item}>
            <Text style={style.itemTexto}>{c.nombre}</Text>
            <Text style={style.itemSub}>{c.estado}</Text>
          </View>
        ))}
      </Tarjeta>

      <Tarjeta titulo="Registrados en 2026" subtitulo="Los más recientes del año">
        {data.clientes2026.map(c => (
          <View key={c.id_cliente} style={style.item}>
            <Text style={style.itemTexto}>{c.nombre}</Text>
            <Text style={style.itemSub}>{dia(c.fecha_registro)}</Text>
          </View>
        ))}
      </Tarjeta>

      <Tarjeta titulo="Correo con p o m" subtitulo="Ordenados por correo">
        {data.clientesPorCorreo.map(c => (
          <View key={c.id_cliente} style={style.item}>
            <Text style={style.itemTexto}>{c.nombre}</Text>
            <Text style={style.itemSub}>{c.correo}</Text>
          </View>
        ))}
      </Tarjeta>

      {ultimo && (
        <Tarjeta titulo="Más reciente" subtitulo="Último cliente registrado">
          <View style={style.item}>
            <Text style={style.itemTexto}>{ultimo.nombre}</Text>
            <Text style={style.itemSub}>{ultimo.correo}</Text>
          </View>
          <View style={style.item}>
            <Text style={style.itemTexto}>{ultimo.ciudad}</Text>
            <Text style={style.itemSub}>{ultimo.estado}</Text>
          </View>
          <View style={style.item}>
            <Text style={style.itemTexto}>Registro</Text>
            <Text style={style.itemSub}>{dia(ultimo.fecha_registro)}</Text>
          </View>
        </Tarjeta>
      )}

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