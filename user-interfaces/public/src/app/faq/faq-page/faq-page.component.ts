import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss']
})
export class FaqPageComponent implements OnInit {
  faqs = [
    {
      title: ' ¿QUÉ ES SISOCS Y PARA QUÉ SE UTILIZA?',
      response: ' El Sistema de Información y Seguimiento de Obras y Contratos de Supervisión “SISOCS” es la herramienta creada por Decreto Ejecutivo PCM 02-2015, mediante la cual se publica y difunde información relevante de los procesos de planificación, adquisición, contratación y ejecución de los proyectos de infraestructura pública.'
    },
    {
      title: '¿CUÁLES SON LAS INSTITUCIONES QUE INGRESAN PROYECTOS?',
      response: ' De acuerdo al Decreto Ejecutivo PCM-02-2015 las entidades que forman parte del Gabinete Central de Infraestructura Productiva están obligadas a divulgar información en SISOCS. Estas instituciones son: La Secretaría de Infraestructura y Servicios Públicos (INSEP), el Fondo Vial, la Secretaría de Salud (SESAL), la Secretaría de Educación (SEDUC), Inversión Estratégica de Honduras (INVEST-H), la Empresa Nacional Portuaria (ENP), la Empresa Hondureña de Telecomunicaciones (Hondutel), Empresa Nacional de Energía Eléctrica (ENEE), y la Secretaría de Estado en los Despachos de Desarrollo Comunitario, Agua y Saneamiento (SEDECOAS).'
    },
    {
      title: '¿CÓMO PUEDO BUSCAR UN PROYECTO?',
      response: ' Para buscar información sobre el proyecto que deseas solo debes colocar alguna palabra clave relacionada a la ubicación del proyecto, por ejemplo, nombre de la ciudad o municipio. Si tienes el nombre del proyecto también puedes colocarlo.Para más información sobre el uso del sistema puedes descargar el Manual de Usuario ciudadano aquí.'
    },
    {
      title: '¿POR QUÉ NO ENCUENTRO EL PROYECTO QUE BUSCO?',
      response: 'Antes de buscar un proyecto es importante que se trate de investigar cual es la entidad que está a cargo del proyecto, tomando en cuenta que no todas las entidades a cargo de ejecutar proyectos de infraestructura pública se encuentran divulgando en este portal. Por ejemplo, los proyectos ejecutados bajo modalidad de Alianza Público-Privada (APP) se encuentran en el portal de transparencia de APP, al cual puedes acceder haciendo clic aquí Si el proyecto que buscas pertenece a alguna de las entidades obligadas a divulgar información en el SISOCS pero aun así no encuentras la información, es probable que esta aun no haya sido publicada. Para verificar si es este el caso puedes enviar una pregunta en la viñeta de “contáctenos” .'
    },
    {
      title: '¿QUÉ TIPO DE INFORMACIÓN PUEDO ENCONTRAR EN SISOCS?',
      response: 'En el Sistema de Información y Seguimiento de Obras y Contratos de Supervisión (SISOCS) podrás encontrar toda la información de cada una de las etapas en la que se encuentran los proyectos de infraestructura ejecutados por las entidades antes mencionadas. Esta información corresponde a 66 puntos de datos del Estándar de la Iniciativa de Transparencia en Infraestructura CoST Honduras Algunos de estos datos son: nombre de las empresas participantes en la licitación, y nombre de la empresa adjudicada, el contrato de construcción y supervisión, el costo inicial y final del proyecto, razones de modificaciones de los contratos, entre otros.'
    },
    {
      title: '¿TIENES ALGUNA OTRA PREGUNTA?',
      response: 'Envíala a nuestro <a target="_blank" href="https://sisocs.org/contacto.php">formulario de contacto</a> .'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
