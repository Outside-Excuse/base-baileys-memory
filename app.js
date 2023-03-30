const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')


//const API_URL = https://university6y.kanbanize.com/api/v2 ;
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowAyuda = addKeyword(['Ayuda', 'ayuda']).addAnswer(
    [
        '📄 En el siguiente link encontraras soporte de Kanbanize',
        'https://kanbanize.com/es/atencion-cliente',
        '\n*Ok* para regresar.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowConsultarTablero = addKeyword(['Consultar', 'consultar']).addAnswer(
    [
        '🚀  Flujo para *Consultar tablero*, se pedirán los datos necesarios al usuario.',
        
        '\n*Ok* Para regresar.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowMoverTarjeta = addKeyword(['Mover', 'mover']).addAnswer(  //flow MOVER TARJETA
    [
        '🚀 Flujo para *mover tarjeta*, se pedirán los datos necesarios al usuario.',
        '\n*Ok* Para regresar.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowCrearTarjeta = addKeyword(['Agregar','agregar']).addAnswer(        //flow CREAR TARJETA
    ['🚀 Flujo para *Crear tarjeta*, se pedirán los datos necesarios al usuario.', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo','Hola','OK','ok','Ok'])
    .addAnswer('¡Hola! Soy *KanBot*')
    .addAnswer(
        [
            'Te comparto las siguientes acciones que puedes realizar. ',
            '👉 *Consultar* para Consultar tablero',
            '👉 *Mover*  para mover una tarjeta',
            '👉 *Agregar*  para crear tarjeta',
        ],
        null,
        null,
        [flowAyuda, flowMoverTarjeta, flowConsultarTablero, flowCrearTarjeta ]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
