var ss = 0;
var cabTemporal = [];
var itemSelected;
const buildschudule = (_cabecera = []) => {
  let itemSchudule = document.getElementsByTagName("template")[0].content;
  var listSchudule = document.getElementById("list-schudule");
  listSchudule.innerHTML = "";
  _cabecera.forEach((value, index) => {
    var _li = itemSchudule.querySelector("li");
    _li.id = "item-schudule-" + index;

    // clona el item de horairo
    let cloneItem = document.importNode(itemSchudule, true);
    //lo agrega al scroll
    listSchudule.appendChild(cloneItem);

    var _itemSchudule = document.getElementById("item-schudule-" + index);
    //si no esta deshabilitado, se le agrega el evento
    if (!value.isDisabled) {
      _itemSchudule.addEventListener("click", () =>
        selectItem("item-schudule-" + index, value.fecha)
      );
    }
    if (value.isDisabled) {
      _itemSchudule.className += " card-disabled";
    }
    createItemSch(
      _itemSchudule,
      value.fechaCorta,
      value.isDisabled ? "<br>" : "S./ " + value.precio
    );

    if (itemSelected === value.fecha) {
      setClassnameItemSch(_itemSchudule);
    }
  });
};
const createItemSch = (itemSchudule, fecha, precio) => {
  itemSchudule.children[0].innerHTML = fecha;
  itemSchudule.children[1].innerHTML = precio;
};

const setClassnameItemSch = (itemSchudule) => {
  var _class = itemSchudule.className;
  setDefClassSch(itemSchudule);

  var isHere = _class.match("card-selected");
  itemSchudule.className += isHere ? "" : " card-selected";

  isHere = itemSchudule.children[0].className.match("title-selected");
  itemSchudule.children[0].className += isHere ? "" : " title-selected";

  isHere = itemSchudule.children[1].className.match("subTitle-selected");
  itemSchudule.children[1].className += isHere ? "" : " subTitle-selected";
};

const setDefClassSch = (itemSchudule) => {
  var _class = itemSchudule.className;
  var isHere = _class.match("card-disabled");
  itemSchudule.className = isHere
    ? "main__card-item card-disabled"
    : "main__card-item";
  itemSchudule.children[0].className = "main__card-item--title";
  itemSchudule.children[1].className = "main__card-item--subTitle";
};

const selectItem = (id, idItem) => {
  var itemSchudule = document.getElementById(id);
  for (let index = 0; index < 5; index++) {
    var _itemSchudule = document.getElementById("item-schudule-" + index);
    setDefClassSch(_itemSchudule);
  }
  listSchudule.innerHTML = "";
  listCard.innerHTML = "";
  loading.innerHTML = "<img src='/bus-loader.gif' />";
  cabTemporal = ss === 0 ? cabecera2 : cabecera;
  ss = ss === 0 ? 1 : 0;
  itemSelected = idItem;
  buildschudule(cabTemporal);

  // setClassnameItemSch(itemSchudule);
};

var cabecera = [
  {
    fecha: "2021-09-29T00:00:00",
    fechaCorta: "Wed 29 Sep",
    isDisabled: true,
    precio: "0",
  },
  {
    fecha: "2021-09-30T00:00:00",
    fechaCorta: "Thu 30 Sep",
    isDisabled: true,
    precio: "0",
  },
  {
    fecha: "2021-10-01T00:00:00",
    fechaCorta: "Fri 01 Oct",
    isDisabled: false,
    precio: "65",
  },
  {
    fecha: "2021-10-02T00:00:00",
    fechaCorta: "Sat 02 Oct",
    isDisabled: false,
    precio: "65",
  },
  {
    fecha: "2021-10-03T00:00:00",
    fechaCorta: "Sun 03 Oct",
    isDisabled: false,
    precio: "65",
  },
];
var cabecera2 = [
  {
    fecha: "2021-09-30T00:00:00",
    fechaCorta: "Thu 30 Sep",
    isDisabled: true,
    precio: "0",
  },
  {
    fecha: "2021-10-01T00:00:00",
    fechaCorta: "Fri 01 Oct",
    isDisabled: false,
    precio: "65",
  },
  {
    fecha: "2021-10-02T00:00:00",
    fechaCorta: "Sat 02 Oct",
    isDisabled: false,
    precio: "65",
  },
  {
    fecha: "2021-10-03T00:00:00",
    fechaCorta: "Sun 03 Oct",
    isDisabled: false,
    precio: "65",
  },
  {
    fecha: "2021-10-04T00:00:00",
    fechaCorta: "Sun 04 Oct",
    isDisabled: true,
    precio: "0",
  },
];
cabTemporal = cabecera;
itemSelected = cabTemporal.filter((value) => !value.isDisabled)[0].fecha;
buildschudule(cabTemporal);
const buildListItinerario = (dataIni) => {
  var listCard = document.getElementById("list-cards");
  listCard.innerHTML = "";

  var __data = dataIni;
  __data.data = JSON.parse(__data.data);
  if (!__data.success) {
    listCard.appendChild(cardMessage({ message: __data.message }));
    return;
  }

  //buildCards
  __data.data.forEach((value, index) => {
    listCard.appendChild(cardComponent({ value }));
  });
  //buildCards
};

const cardComponent = ({ value }) => {
  let card = document.getElementsByTagName("template")[1].content;
  var _card = document.importNode(card, true);
  var itinerario = JSON.parse(value.itinerario);

  _card.querySelector("div").appendChild(
    infoTravelComponent({
      hora: itinerario.HSalida,
      tipoServicio: itinerario.Abrev_Servicio,
      parada: value.parada,
    })
  );

  _card.querySelector("div").appendChild(
    infoLapsComponent({
      embDesmb: JSON.parse(value.embDesmb),
      pisos: JSON.parse(value.servicePisos),
      itinerario: itinerario,
    })
  );

  let actionCard = document.getElementsByTagName("template")[5].content;
  var _actionCard = document.importNode(actionCard, true);
  _card.querySelector("div").appendChild(_actionCard);
  return _card;
};

const infoTravelComponent = ({ hora, tipoServicio, parada }) => {
  //extrae y clona inforcomponent
  let infoTravel = document.getElementsByTagName("template")[2].content;
  var _inforTravel = document.importNode(infoTravel, true);

  //inserta hora y tipo de servicio
  var mainInfo = _inforTravel.querySelector("section").querySelector("div");

  var _hora = mainInfo.children[0].children[0];
  var _servicio = mainInfo.children[0].children[1];
  _hora.innerHTML = hora;
  _servicio.innerHTML = tipoServicio;

  //inserta parada
  var _parada = mainInfo.children[1];
  _parada.innerHTML = parada;

  return mainInfo;
};
const infoLapsComponent = ({ embDesmb, pisos, itinerario }) => {
  let infoLapsTravel = document.getElementsByTagName("template")[3].content;
  var _infoLapsTravel = document.importNode(infoLapsTravel, true);

  //extraer info de desembarque
  var childrenIL = _infoLapsTravel
    .querySelector("div")
    .querySelectorAll("section");
  var embDesemb = childrenIL[0].children[0].children;
  embDesemb[0].children[0].children[0].innerHTML = embDesmb.Origen;
  embDesemb[0].children[0].children[1].innerHTML = embDesmb.PtoEmbarque;

  embDesemb[1].children[0].children[0].innerHTML = embDesmb.Destino;
  embDesemb[1].children[0].children[1].innerHTML = embDesmb.PtoDesembarque;

  //extraer info de pisos

  pisos.forEach((value, index) => {
    let goLap = document.getElementsByTagName("template")[4].content;
    var _goLap = document.importNode(goLap, true);
    var infoPiso = _goLap.querySelector("div").children[0].children;

    infoPiso[0].children[0].innerHTML = "Piso " + (index + 1);
    infoPiso[0].children[1].innerHTML = value.libres + " libres";

    var precio = infoPiso[1].children[0];
    precio.innerHTML = value.precio + " soles";
    infoPiso[1].innerHTML =
      (value.isDesdePiso ? "Desde " : "Precio ") + precio.innerHTML;

    childrenIL[1].appendChild(_goLap);
  });

  return _infoLapsTravel;
};
const cardMessage = ({ message }) => {
  let messageComp = document.getElementsByTagName("template")[3].content;
  var _messageComp = document.importNode(messageComp, true);
  _messageComp.querySelector("p").innerHTML = message;
  return _messageComp;
};
var _dataIti = {
  message: "",
  success: true,
  isUserPoints: false,
  data: '[{"itinerario":"{\\"Nro_Viaje\\":\\"4030405\\",\\"Bus\\":\\"0670\\",\\"Cod1\\":\\"43\\",\\"Serv1\\":\\"ESPECIAL 1°PISO\\",\\"Cod2\\":\\"44\\",\\"Serv2\\":\\"ESPECIAL 2°PISO\\",\\"FSalida\\":\\"04/10/2021\\",\\"HSalida\\":\\" 8:30 pm\\",\\"FLlegada\\":\\"\\",\\"HLlegada\\":\\"\\",\\"Precio1\\":\\"90\\",\\"Precio2\\":\\"65\\",\\"Libres1\\":\\"5\\",\\"Libres2\\":\\"28\\",\\"IdaVuelta1\\":null,\\"IdaVuelta2\\":null,\\"S1\\":\\"\\",\\"S2\\":\\"\\",\\"EsdosPisos\\":1,\\"Activo\\":\\"1\\",\\"Llegada\\":\\"0670\\",\\"Escala\\":\\"Lima-Terminal Plaza Norte\\",\\"Puntos1\\":0,\\"Puntos2\\":0,\\"PrecioMin1\\":\\"90\\",\\"PrecioMin2\\":\\"65\\",\\"PrecioMax1\\":\\"95\\",\\"PrecioMax2\\":\\"65\\",\\"Abrev_Servicio\\":\\"ESPECIAL\\"}","embDesmb":"{\\"Viaje\\":0,\\"Origen\\":null,\\"Destino\\":null,\\"PtoEmbarque\\":\\"Av. America Sur Nro 2857\\",\\"PtoDesembarque\\":\\"Av. Paseo de La República 941- La Victoria\\"}","servicePisos":"[{\\"pointsHidden\\":true,\\"isDesdePiso\\":true,\\"piso\\":\\"[{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/asientos-160.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Asientos tipo Sofá 160°\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Asientos160\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/wifi.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"WiFi\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"WiFi\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/aire-acondicionado.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Aire Acondicionado\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Aireacondicionado\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/peliculas.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Películas\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Películas\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/servicios_higienicos_2.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Servicios Higiénicos\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"ServiciosHigiénicos\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/cargador-electrico.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Cargador eléctrico\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Cargadoreléctrico\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/botiquin.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Botiquín\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Botiquín\\\\\\"}]\\",\\"libres\\":\\"5\\",\\"precio\\":90.0},{\\"pointsHidden\\":true,\\"isDesdePiso\\":false,\\"piso\\":\\"[{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/asiento-ergonomico.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Asientos Ergonómicos\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"AsientosErgonómicos\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/wifi.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"WiFi\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"WiFi\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/aire-acondicionado.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Aire Acondicionado\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Aireacondicionado\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/peliculas.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Películas\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Películas\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/servicios_higienicos_2.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Servicios Higiénicos\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"ServiciosHigiénicos\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/botiquin.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Botiquín\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Botiquín\\\\\\"}]\\",\\"libres\\":\\"28\\",\\"precio\\":65.0}]","parada":"1 Parada intermedia"},{"itinerario":"{\\"Nro_Viaje\\":\\"4030407\\",\\"Bus\\":\\"0665\\",\\"Cod1\\":\\"17\\",\\"Serv1\\":\\"SUPER VIP 1°PISO\\",\\"Cod2\\":\\"18\\",\\"Serv2\\":\\"SUPER VIP 2°PISO\\",\\"FSalida\\":\\"04/10/2021\\",\\"HSalida\\":\\" 9:00 pm\\",\\"FLlegada\\":\\"\\",\\"HLlegada\\":\\"\\",\\"Precio1\\":\\"95\\",\\"Precio2\\":\\"120\\",\\"Libres1\\":\\"6\\",\\"Libres2\\":\\"15\\",\\"IdaVuelta1\\":null,\\"IdaVuelta2\\":null,\\"S1\\":\\"\\",\\"S2\\":\\"\\",\\"EsdosPisos\\":1,\\"Activo\\":\\"1\\",\\"Llegada\\":\\"0665\\",\\"Escala\\":\\"\\",\\"Puntos1\\":0,\\"Puntos2\\":0,\\"PrecioMin1\\":\\"95\\",\\"PrecioMin2\\":\\"120\\",\\"PrecioMax1\\":\\"100\\",\\"PrecioMax2\\":\\"130\\",\\"Abrev_Servicio\\":\\"SUPER VIP\\"}","embDesmb":"{\\"Viaje\\":0,\\"Origen\\":null,\\"Destino\\":null,\\"PtoEmbarque\\":\\"Av. America Sur Nro 2857\\",\\"PtoDesembarque\\":\\"Av. Paseo de La República 941- La Victoria\\"}","servicePisos":"[{\\"pointsHidden\\":true,\\"isDesdePiso\\":true,\\"piso\\":\\"[{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/asientos-160.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Asientos tipo Sofá 160°\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Asientos160\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/wifi.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"WiFi\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"WiFi\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/aire-acondicionado.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Aire Acondicionado\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Aireacondicionado\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/peliculas.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Películas\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Películas\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/servicios_higienicos_2.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Servicios Higiénicos\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"ServiciosHigiénicos\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/cargador-electrico.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Cargador eléctrico\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Cargadoreléctrico\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/botiquin.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Botiquín\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Botiquín\\\\\\"}]\\",\\"libres\\":\\"6\\",\\"precio\\":95.0},{\\"pointsHidden\\":true,\\"isDesdePiso\\":true,\\"piso\\":\\"[{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/asientos-180.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Asientos tipo Sofá 180°\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Asientos180\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/wifi.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"WiFi\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"WiFi\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/aire-acondicionado.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Aire Acondicionado\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Aireacondicionado\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/peliculas.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Películas\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Películas\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/servicios_higienicos_2.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Servicios Higiénicos\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"ServiciosHigiénicos\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/cargador-electrico.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Cargador eléctrico\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Cargadoreléctrico\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/botiquin.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Botiquín\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Botiquín\\\\\\"}]\\",\\"libres\\":\\"15\\",\\"precio\\":120.0}]","parada":""},{"itinerario":"{\\"Nro_Viaje\\":\\"4030410\\",\\"Bus\\":\\"0674\\",\\"Cod1\\":\\"43\\",\\"Serv1\\":\\"ESPECIAL 1°PISO\\",\\"Cod2\\":\\"44\\",\\"Serv2\\":\\"ESPECIAL 2°PISO\\",\\"FSalida\\":\\"04/10/2021\\",\\"HSalida\\":\\" 9:30 pm\\",\\"FLlegada\\":\\"\\",\\"HLlegada\\":\\"\\",\\"Precio1\\":\\"90\\",\\"Precio2\\":\\"65\\",\\"Libres1\\":\\"7\\",\\"Libres2\\":\\"25\\",\\"IdaVuelta1\\":null,\\"IdaVuelta2\\":null,\\"S1\\":\\"\\",\\"S2\\":\\"\\",\\"EsdosPisos\\":1,\\"Activo\\":\\"1\\",\\"Llegada\\":\\"0674\\",\\"Escala\\":\\"Lima-Terminal Plaza Norte\\",\\"Puntos1\\":0,\\"Puntos2\\":0,\\"PrecioMin1\\":\\"90\\",\\"PrecioMin2\\":\\"65\\",\\"PrecioMax1\\":\\"95\\",\\"PrecioMax2\\":\\"65\\",\\"Abrev_Servicio\\":\\"ESPECIAL\\"}","embDesmb":"{\\"Viaje\\":0,\\"Origen\\":null,\\"Destino\\":null,\\"PtoEmbarque\\":\\"Av. America Sur Nro 2857\\",\\"PtoDesembarque\\":\\"Av. Paseo de La República 941- La Victoria\\"}","servicePisos":"[{\\"pointsHidden\\":true,\\"isDesdePiso\\":true,\\"piso\\":\\"[{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/asientos-160.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Asientos tipo Sofá 160°\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Asientos160\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/wifi.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"WiFi\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"WiFi\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/aire-acondicionado.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Aire Acondicionado\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Aireacondicionado\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/peliculas.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Películas\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Películas\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/servicios_higienicos_2.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Servicios Higiénicos\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"ServiciosHigiénicos\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/cargador-electrico.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Cargador eléctrico\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Cargadoreléctrico\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/botiquin.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Botiquín\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Botiquín\\\\\\"}]\\",\\"libres\\":\\"7\\",\\"precio\\":90.0},{\\"pointsHidden\\":true,\\"isDesdePiso\\":false,\\"piso\\":\\"[{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/asiento-ergonomico.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Asientos Ergonómicos\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"AsientosErgonómicos\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/wifi.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"WiFi\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"WiFi\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/aire-acondicionado.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Aire Acondicionado\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Aireacondicionado\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/peliculas.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Películas\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Películas\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/servicios_higienicos_2.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Servicios Higiénicos\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"ServiciosHigiénicos\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/botiquin.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Botiquín\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Botiquín\\\\\\"}]\\",\\"libres\\":\\"25\\",\\"precio\\":65.0}]","parada":"1 Parada intermedia"},{"itinerario":"{\\"Nro_Viaje\\":\\"4035837\\",\\"Bus\\":\\"0666\\",\\"Cod1\\":\\"17\\",\\"Serv1\\":\\"SUPER VIP 1°PISO\\",\\"Cod2\\":\\"18\\",\\"Serv2\\":\\"SUPER VIP 2°PISO\\",\\"FSalida\\":\\"04/10/2021\\",\\"HSalida\\":\\"10:00 pm\\",\\"FLlegada\\":\\"\\",\\"HLlegada\\":\\"\\",\\"Precio1\\":\\"95\\",\\"Precio2\\":\\"120\\",\\"Libres1\\":\\"9\\",\\"Libres2\\":\\"19\\",\\"IdaVuelta1\\":null,\\"IdaVuelta2\\":null,\\"S1\\":\\"\\",\\"S2\\":\\"\\",\\"EsdosPisos\\":1,\\"Activo\\":\\"1\\",\\"Llegada\\":\\"0666\\",\\"Escala\\":\\"\\",\\"Puntos1\\":0,\\"Puntos2\\":0,\\"PrecioMin1\\":\\"95\\",\\"PrecioMin2\\":\\"120\\",\\"PrecioMax1\\":\\"100\\",\\"PrecioMax2\\":\\"130\\",\\"Abrev_Servicio\\":\\"SUPER VIP\\"}","embDesmb":"{\\"Viaje\\":0,\\"Origen\\":null,\\"Destino\\":null,\\"PtoEmbarque\\":\\"Av. America Sur Nro 2857\\",\\"PtoDesembarque\\":\\"Av. Paseo de La República 941- La Victoria\\"}","servicePisos":"[{\\"pointsHidden\\":true,\\"isDesdePiso\\":true,\\"piso\\":\\"[{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/asientos-160.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Asientos tipo Sofá 160°\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Asientos160\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/wifi.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"WiFi\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"WiFi\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/aire-acondicionado.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Aire Acondicionado\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Aireacondicionado\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/peliculas.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Películas\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Películas\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/servicios_higienicos_2.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Servicios Higiénicos\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"ServiciosHigiénicos\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/cargador-electrico.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Cargador eléctrico\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Cargadoreléctrico\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/botiquin.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Botiquín\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Botiquín\\\\\\"}]\\",\\"libres\\":\\"9\\",\\"precio\\":95.0},{\\"pointsHidden\\":true,\\"isDesdePiso\\":true,\\"piso\\":\\"[{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/asientos-180.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Asientos tipo Sofá 180°\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Asientos180\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/wifi.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"WiFi\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"WiFi\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/aire-acondicionado.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Aire Acondicionado\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Aireacondicionado\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/peliculas.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Películas\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Películas\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/servicios_higienicos_2.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Servicios Higiénicos\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"ServiciosHigiénicos\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/cargador-electrico.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Cargador eléctrico\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Cargadoreléctrico\\\\\\"},{\\\\\\"ruta\\\\\\":\\\\\\"http://linea.pe/img_prestaciones/botiquin.png\\\\\\",\\\\\\"nombre\\\\\\":\\\\\\"Botiquín\\\\\\",\\\\\\"etiqueta\\\\\\":\\\\\\"Botiquín\\\\\\"}]\\",\\"libres\\":\\"19\\",\\"precio\\":120.0}]","parada":""}]',
};
buildListItinerario(_dataIti);
