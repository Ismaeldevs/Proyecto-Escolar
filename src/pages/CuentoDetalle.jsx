
import "../Style/CuentoDetalle.css";
import React, { useEffect, useState, useRef } from 'react';

const cuentosTexto = {
  
  "liebre-tortuga": {
    titulo: "La Liebre y la Tortuga",
    imagen: "./imagenCuentos/laliebreylatortuga.jpeg",
    texto: `
Había una vez una liebre muy veloz que siempre se burlaba de la tortuga por caminar tan lento. 

Un día, la tortuga, cansada de las burlas, le dijo a la liebre:
—Podemos correr una carrera si tanto te creés superior.

La liebre, entre risas, aceptó. 
Cuando comenzaron, la tortuga avanzó despacito pero sin detenerse.  
La liebre, confiada, se acostó a dormir bajo un árbol.

Pasó el tiempo… y la tortuga siguió avanzando, pasito a pasito, hasta adelantarse.  
Cuando la liebre despertó, corrió lo más rápido que pudo, ¡pero ya era tarde!

La tortuga cruzó la meta y ganó.

Moraleja: *No importa la velocidad, sino la constancia.*
`
  },

  "leon-raton": {
    titulo: "El León y el Ratón",
    imagen: "./imagenCuentos/LeonyRaton.jpeg",
    texto: `
Un gran león dormía en el bosque cuando un pequeño ratón corrió sin querer sobre su nariz.  
El león despertó furioso y atrapó al ratón entre sus garras.

—¡Por favor no me comas! —chilló el ratoncito—. ¡Algún día podría ayudarte!

El león soltó una carcajada, pero finalmente decidió dejarlo ir.

Días después, el león quedó atrapado en una red de cazadores. Rugió, pidió ayuda… pero nadie acudió.

Entonces apareció el ratoncito. Con sus pequeños dientes, comenzó a roer la cuerda hasta liberar al león.

—¿Viste? —dijo el ratón—. Hasta el más pequeño puede ayudar al más grande.

El león le agradeció y se hicieron amigos para siempre.
`
  },

  "cigarra-hormiga": {
    titulo: "La Cigarra y la Hormiga",
    imagen: "./imagenCuentos/cigarra-hormiga.jpeg",
    texto: `
Durante el verano, la cigarra cantaba feliz bajo el sol mientras la hormiga trabajaba sin parar, guardando comida para el invierno. 

—¡Trabajás demasiado! —decía la cigarra—. ¡Disfrutá!

Pero cuando llegó el invierno, la cigarra no tenía nada para comer.  
Temblando de frío, fue a la casa de la hormiga.

La hormiga, aunque cansada, le abrió la puerta, la invitó a entrar y le compartió comida.  
—Aprendí mi lección —dijo la cigarra—. En el próximo verano trabajaré contigo.

Y así lo hizo.
`
  },

  "patito-feo": {
    titulo: "El Patito Feo",
    imagen: "./imagenCuentos/PatitoFeo.jpeg",
    texto: `
En la granja había un gran alboroto: los polluelos de Mamá Pata estaban rompiendo el cascarón.

Uno a uno, comenzaron a salir. Mamá Pata estaba tan emocionada con sus adorables patitos que no notó que uno de sus huevos, el más grande de todos, permanecía intacto.

A las pocas horas, el último huevo comenzó a romperse. Mamá Pata, todos los polluelos y los animales de la granja, se encontraban a la expectativa de conocer al pequeño que tardaba en nacer. De repente, del cascarón salió un patito muy alegre. Cuando todos lo vieron se quedaron sorprendidos, este patito no era pequeño ni amarillo y tampoco estaba cubierto de suaves plumas. Este patito era grande, gris y en vez del esperado graznido, cada vez que hablaba sonaba como una corneta vieja.

Aunque nadie dijo nada, todos pensaron lo mismo: “Este patito es demasiado feo”.

Pasaron los días y todos los animales de la granja se burlaban de él. El patito feo se sintió muy triste y una noche escapó de la granja para buscar un nuevo hogar.

El patito feo recorrió la profundidad del bosque y cuando estaba a punto de darse por vencido, encontró el hogar de una humilde anciana que vivía con una gata y una gallina. El patito se quedó con ellos durante un tiempo, pero como no estaba contento, pronto se fue.

Al llegar el invierno, el pobre patito feo casi se congela. Afortunadamente, un campesino lo llevó a su casa a vivir con su esposa e hijos. Pero el patito estaba aterrado de los niños, quienes gritaban y brincaban todo el tiempo y nuevamente escapó, pasando el invierno en un estanque pantanoso.

Finalmente, llegó la primavera. El patito feo vio a una familia de cisnes nadando en el estanque y quiso acercárseles. Pero recordó cómo todos se burlaban de él y agachó la cabeza avergonzado. Cuando miró su reflejo en el agua se quedó asombrado. Él no era un patito feo, sino un apuesto y joven cisne. Ahora sabía por qué se veía tan diferente a sus hermanos y hermanas. ¡Ellos eran patitos, pero él era un cisne! Feliz, nadó hacia su familia.
`
  },

  // PRINCESAS
  "bella-durmiente": {
    titulo: "La Bella Durmiente",
    imagen: "./imagenCuentos/bella-durmiente.jpeg",
    texto: `
Érase una vez un rey y una reina que vivían muy felices, pero anhelaban tener hijos. Después de muchos años de espera, la reina dio a luz a una hermosa niña y todo el reino los acompañó en su felicidad. Hubo una gran celebración y las hadas del reino fueron invitadas. Pero el rey olvidó invitar a una de ellas. Muy resentida, el hada olvidada se presentó al palacio.

Pronto, llegó el momento en que las hadas le entregaban a la pequeña sus mejores deseos:

—Que crezca y se convierta en la mujer más bella del mundo —dijo la primera hada.

—Que cante con la más dulce y melodiosa voz —dijo la segunda hada.

—Que siempre se comporte con gracia y elegancia —dijo la tercera hada.

—Que sea bondadosa y paciente—dijo la siguiente hada.

Cada una de las hadas, colmaron a la niña de hermosos deseos hasta que llegó el turno del hada que el rey olvidó invitar:

— Cuando la princesa cumpla dieciséis años, se pinchará el dedo con una aguja y ese será su final —dijo con todo el resentimiento que su corazón le permitía albergar en sus palabras.

El rey, la reina y todo el reinado estaban atónitos, le suplicaron al hada que los disculpara por no haberla invitado y se retractara de lo que había dicho, pero el hada se negó a ambas propuestas.

Había una última hada que faltaba por presentar su deseo. Queriendo ayudar a la pequeña, le dijo al rey y a la reina:

—No puedo deshacer las palabras pronunciadas, pero puedo cambiar el curso de los eventos: la princesa no morirá cuando su dedo se pinche con la aguja, pero caerá en un sueño profundo durante cien años. Entonces, un príncipe vendrá y la despertará.

Al escuchar esto, el rey y la reina se sintieron mejor. Pensando que existía la manera de detener el destino, el rey prohibió a todos los habitantes del reino utilizar agujas.

La princesa creció y se convirtió en una niña amable y de dulce corazón. Cuando cumplió sus dieciséis años, vio a una anciana coser:

—¿Puedo intentarlo? —le preguntó.

La anciana le respondió:

— ¡Por supuesto, mi pequeña niña!

La princesa tomó la aguja e intentó enhebrar el hilo. En ese preciso momento se pinchó el dedo y cayó en un profundo sueño. La anciana, que era en realidad el hada resentida, la llevó de regreso al palacio y el rey y la reina la acostaron en su cama.

El reino que antes los había acompañado en la felicidad, los acompañó en la desgracia; todos cayeron en un profundo sueño.

Pasaron cien años. Un día, por cuenta del destino, un príncipe llegó al palacio. Él no podía dar crédito a lo que veían sus ojos: los guardas, sirvientes, gatos y hasta las vacas dormían y roncaban.

Al acercarse a la princesa, pensó que ella era el ser más hermoso del mundo y le plantó un beso en la mejilla. Inmediatamente, la princesa se despertó y junto con ella, el rey, la reina, los guardas, los sirvientes, los gatos y hasta las vacas abrieron sus ojos.

El príncipe y la princesa se casaron y vivieron felices por siempre.
`
  },

  "cenicienta": {
    titulo: "Cenicienta",
    imagen: "./imagenCuentos/cenicienta.jpeg",
    texto: `
Érase una vez una hermosa joven que vivía con su madrastra y dos hermanastras que la obligaban a hacer todo el trabajo de la casa. La pobre joven tenía que cocinar, limpiar y también lavarles la ropa.

Cansada de trabajar, la joven se quedó dormida cerca a la chimenea y cuando se levantó con la cara sucia por las cenizas, sus hermanastras se rieron sin parar y desde entonces comenzaron a llamarla Cenicienta.

Un día llegó a la casa una invitación del rey a un baile para celebrar el cumpleaños del príncipe. Todas las jóvenes del reino fueron invitadas y Cenicienta estaba muy feliz. Sin embargo, cuando llegó el día de la fiesta, su madrastra y hermanastras le dijeron:

—Cenicienta, tú no irás, te quedarás en casa limpiando y preparando la cena para cuando regresemos.

Las tres mujeres salieron hacia el palacio, burlándose de Cenicienta.

Cenicienta corrió al jardín y se sentó en un banco a llorar. Ella deseaba con todo su corazón poder ir al baile. De repente, apareció su hada madrina y le dijo:

—No llores Cenicienta, tú has sido muy buena y mereces ir al baile.

Agitando su varita mágica, el hada madrina transformó una calabaza en un coche, tres ratones de campo en hermosos caballos, y a un perro viejo en un cochero. ¡Cenicienta no podía creer lo que veía!

— ¡Muchas gracias! —exclamó Cenicienta.

—Espera, no he terminado todavía —respondió el hada madrina con una sonrisa.

Con el último movimiento de su varita mágica, transformó a Cenicienta. Le dio un vestido y un par de zapatillas de cristal, y le dijo:

—Ahora podrás ir al baile, sólo recuerda que debes regresar antes de la medianoche ya que a esa hora se terminará la magia.

Cenicienta agradeció nuevamente al hada madrina y muy feliz se dirigió al palacio. Cuando entró, los asistentes, incluyendo sus hermanastras, no podían parar de preguntarse quién podría ser esa hermosa princesa.

El príncipe, tan intrigado como los demás, la invitó a bailar. Después de bailar toda la noche, descubrió que Cenicienta no sólo era la joven más hermosa del reino, sino también la más amable y sincera que él jamás había conocido.

De repente, las campanadas del reloj se hicieron escuchar, era la medianoche. Cenicienta se estaba divirtiendo tanto que casi olvida las palabras del hada madrina.

—¡Oh, no!, debo irme— le dijo al príncipe mientras corría fuera del salón de baile. Ella salió tan de prisa que perdió una de sus zapatillas de cristal en la escalinata.

Decidido a encontrar a la hermosa joven, el príncipe tomó la zapatilla y visitó todas las casas del reino.

Cuando el príncipe llegó a casa de Cenicienta, sus dos hermanas y hasta la madrastra intentaron sin suerte probarse el zapato de cristal. Él se encontraba a punto de marcharse cuando escuchó una voz:

—¿Puedo probarme la zapatilla? —dijo Cenicienta.

La joven se probó la zapatilla y le quedó perfecta. El príncipe sabía que esta era la hermosa joven que estaba buscando. Fue así como Cenicienta y el príncipe se casaron y vivieron felices para siempre.
`
  },

  "rapunzel": {
    titulo: "Rapunzel",
    imagen: "./imagenCuentos/rapunzel.jpeg",
    texto: `
Había una vez una pareja que por mucho tiempo deseaba tener un bebé, hasta que por fin ese deseo se hizo realidad. A través de la ventana trasera de la pequeña casa donde vivían, podían ver un espléndido jardín que estaba lleno de las más bellas plantas y las más suculentas frutas y vegetales. El jardín estaba rodeado por un alto muro, y nadie se atrevía a entrar a él, porque pertenecía a una bruja muy malvada.

Un día, la mujer se asomó a la ventana y vio en el jardín un huerto de espinacas frescas y verdes. Tanto era su anhelo de probarlas que se enfermó gravemente.

El hombre, muy preocupado por la salud de su esposa, decidió tomar el riesgo de entrar al jardín de la bruja. De manera que, en la noche trepó el alto muro que separaba el jardín, rápidamente desenterró un puñado de espinacas y se lo llevó a su mujer. Ella inmediatamente preparó una ensalada, la cual se deleitó en comer.

Las espinacas eran tan deliciosas, que al día siguiente su deseo se hizo aún más grande. Nuevamente, el hombre quiso complacerla y se dispuso a trepar el muro. Pero tan pronto había desenterrado el puñado de espinacas, para su horror, vio a la bruja parada frente a él:

—¿Cómo puedes atreverte a entrar a mi jardín y como un ladrón llevarte mis espinacas? Te juro que pagarás por esto —dijo la bruja con un tono muy amenazante.

—Le ofrezco mis disculpas —respondió el hombre con voz temblorosa—, hice esto por necesidad. Mi esposa está embarazada y al ver sus espinacas sintió un anhelo que se apoderó de ella, desde ese entonces ha estado muy enferma.

La ira de la bruja disminuyó un poco, y dijo:

—Si las cosas son como dices, te permitiré tomar todas las espinacas que quieras, estas salvarán la vida de tu esposa, pero bajo una condición: me tienes que dar el hijo que tu esposa va a tener. Yo seré su madre, conmigo será feliz y nunca le faltará nada.

El pobre hombre estaba tan aterrorizado que no tuvo más remedio que aceptar. Tan pronto la esposa dio a luz, la bruja se llevó a la niña y la llamó Rapunzel.

Rapunzel se convirtió en la niña más hermosa bajo el sol. Cuando tenía doce años, la bruja la encerró en una torre en medio de un espeso bosque. La torre no tenía escaleras ni puertas, solo una pequeña ventana en lo alto. Cada vez que la bruja quería subir a la torre, se paraba bajo la ventana y gritaba:

—¡Rapunzel, Rapunzel, deja tu trenza caer!

La niña dejaba caer por la ventana su larga trenza dorada y la bruja subía la torre.

Muchos años después, el hijo del rey estaba cabalgando por el bosque. Al acercarse a la torre, escuchó una canción tan hermosa que lo hizo detenerse. Era Rapunzel, que estaba pasando el tiempo cantando con su dulce y hermosa voz. El príncipe quiso alcanzarla, y buscó una puerta en la torre, pero no encontró alguna.

Entonces, cabalgó al palacio. Sin embargo, la canción le había llegado tan profundo al corazón, que siguió regresando al bosque todos los días para escucharla.

Un día, mientras estaba escondido detrás de un árbol, vio a la bruja acercarse y la escuchó decir:

—¡Rapunzel, Rapunzel, deja tu trenza caer!

Sabiendo cómo subir la torre, el príncipe regresó en la noche y gritó:

—¡Rapunzel, Rapunzel, deja tu trenza caer!

Rapunzel dejó caer su trenza pensando que era la malvada bruja y el príncipe subió.

Al principio Rapunzel se asustó, pero el príncipe le explicó que la había escuchado cantar y que su hermosa voz le había robado el corazón.

Rapunzel perdió el miedo y cuando él le preguntó si lo tomaría como esposo, ella aceptó feliz.

Los dos pensaron que la mejor manera para que Rapunzel escapara de la torre, sería que el príncipe le trajera un hilo de seda todos los días y que ella lo tejiera en una escalera para luego descenderla.

Pero un día, mientras Rapunzel estaba tejiendo la escalera, la bruja vino a visitarla y gritó:

—¡Rapunzel, Rapunzel, deja tu trenza caer!

Cuando la bruja malvada entró en la habitación de Rapunzel, vio la escalera y se enojó muchísimo:

—¡Me has traicionado! —dijo furiosa.

Sin decir más, la malvada bruja tomó un par de tijeras y cortó el hermoso cabello de Rapunzel. Al día siguiente, cuando el Príncipe llegó con más hilo de seda, la bruja lo engañó arrojándole la trenza por la ventana para que él subiera. Al entrar a la torre, no vio a su querida Rapunzel sino a la bruja.

—Nunca volverás a ver a tu Rapunzel— dijo la bruja en medio de carcajadas.

El príncipe estaba tan desesperado por encontrar a Rapunzel que, sin pensarlo, saltó de la torre y cayó sobre unas espinas que lo dejaron ciego.

Durante muchos años, vagó por el bosque hasta que tropezó con un hermoso lago. Allí escuchó un canto que reconoció al instante… ¡era la voz de su queria Rapunzel! Cuando Rapunzel vio al príncipe, se abalanzó sobre él llorando. Sus lágrimas se posaron sobre los ojos del príncipe y pudo él volver a ver. Rapunzel y el príncipe se casaron y fueron felices para siempre.
`
  },

  "princesa-guisante": {
    titulo: "La Princesa y el Guisante",
    imagen: "./imagenCuentos/princesa-guisante.jpeg",
    texto: `
Había una vez un príncipe que quería casarse con una princesa, pero tenía que ser una princesa genuina. Para encontrar a esta princesa, viajó por todo el mundo, pero en ningún lugar podía encontrarla. Princesas había por montones, pero el príncipe no podía estar seguro de que fueran princesas reales; siempre descubría algo en ellas que le disgustaba.

Cierta noche cayó una tormenta, hubo truenos y relámpagos, y se desencadenó una lluvia torrencial. Entonces alguien tocó a la puerta del castillo y la reina fue a ver de quién se trataba.

En el umbral del palacio apareció una joven, pero la lluvia y el viento causaron estragos en su aspecto. El agua le corría por el cabello y el vestido estaba hecho harapos, había perdido sus joyas y hasta los zapatos.

—Exijo hospedaje pues soy una princesa—dijo la joven con tono muy airoso.

La reina dudó que la joven poseyera algún título de nobleza, pero no dijo nada y la invitó a pasar. La joven esperó en el salón real.

La reina se dirigió hacia el dormitorio de huéspedes, quitó toda la ropa de cama y puso un guisante sobre el colchón, luego colocó otros 20 colchones encima del guisante, y encima de los veinte colchones puso veinte edredones de plumas. Después regresó al salón real y señalando el dormitorio de huéspedes dijo:

—Puedes dormir en esa habitación.

A la mañana siguiente, la reina y el príncipe le preguntaron a la joven cómo había dormido.

—¡Oh!, terriblemente mal — respondió la joven—. No pude conciliar el sueño en toda la noche. Solo el cielo sabrá lo que había en la cama. Dormí encima de algo tan duro que tengo el cuerpo lleno de moretones. ¡Fue horrible!

Ahora sabían que ella era una verdadera princesa porque había sentido el guisante a través de los veinte colchones y los veinte edredones. ¡Solo una princesa genuina puede ser tan sensible!

Fue así como el príncipe se casó con ella, seguro de haber conseguido lo que tanto buscaba. En cuanto al guisante, es exhibido en el museo, donde debe seguir todavía si es que nadie se lo ha llevado.

¡Y esta sí es una historia verdadera!
`
  },

  // CLÁSICOS
  "caperucita": {
    titulo: "Caperucita Roja",
    imagen: "./imagenCuentos/caperucita.jpeg",
    texto: `
Érase una vez una niñita que lucía una hermosa capa de color rojo. Como la niña la usaba muy a menudo, todos la llamaban Caperucita Roja.

Un día, la mamá de Caperucita Roja la llamó y le dijo:

—Abuelita no se siente muy bien, he horneado unas galleticas y quiero que tú se las lleves.

—Claro que sí —respondió Caperucita Roja, poniéndose su capa y llenando su canasta de galleticas recién horneadas.

Antes de salir, su mamá le dijo:

— Escúchame muy bien, quédate en el camino y nunca hables con extraños.

—Yo sé mamá —respondió Caperucita Roja y salió inmediatamente hacia la casa de la abuelita.

Para llegar a casa de la abuelita, Caperucita debía atravesar un camino a lo largo del espeso bosque. En el camino, se encontró con el lobo.

—Hola niñita, ¿hacia dónde te diriges en este maravilloso día? —preguntó el lobo.

Caperucita Roja recordó que su mamá le había advertido no hablar con extraños, pero el lobo lucía muy elegante, además era muy amigable y educado.

—Voy a la casa de abuelita, señor lobo —respondió la niña—. Ella se encuentra enferma y voy a llevarle estas galleticas para animarla un poco.

—¡Qué buena niña eres! —exclamó el lobo. —¿Qué tan lejos tienes que ir?

—¡Oh! Debo llegar hasta el final del camino, ahí vive abuelita—dijo Caperucita con una sonrisa.

—Te deseo un muy feliz día mi niña —respondió el lobo.

El lobo se adentró en el bosque. Él tenía un enorme apetito y en realidad no era de confiar. Así que corrió hasta la casa de la abuela antes de que Caperucita pudiera alcanzarlo. Su plan era comerse a la abuela, a Caperucita Roja y a todas las galleticas recién horneadas.

El lobo tocó la puerta de la abuela. Al verlo, la abuelita corrió despavorida dejando atrás su chal. El lobo tomó el chal de la viejecita y luego se puso sus lentes y su gorrito de noche. Rápidamente, se trepó en la cama de la abuelita, cubriéndose hasta la nariz con la manta. Pronto escuchó que tocaban la puerta:

—Abuelita, soy yo, Caperucita Roja.

Con vos disimulada, tratando de sonar como la abuelita, el lobo dijo:

—Pasa mi niña, estoy en camita.

Caperucita Roja pensó que su abuelita se encontraba muy enferma porque se veía muy pálida y sonaba terrible.

—¡Abuelita, abuelita, qué ojos más grandes tienes!

—Son para verte mejor —respondió el lobo.

—¡Abuelita, abuelita, qué orejas más grandes tienes!

—Son para oírte mejor —susurró el lobo.

—¡Abuelita, abuelita, que dientes más grandes tienes!

—¡Son para comerte mejor!

Con estas palabras, el malvado lobo tiró su manta y saltó de la cama. Asustada, Caperucita salió corriendo hacia la puerta. Justo en ese momento, un leñador se acercó a la puerta, la cual se encontraba entreabierta. La abuelita estaba escondida detrás de él.

Al ver al leñador, el lobo saltó por la ventana y huyó espantado para nunca ser visto.

La abuelita y Caperucita Roja agradecieron al leñador por salvarlas del malvado lobo y todos comieron galleticas con leche. Ese día Caperucita Roja aprendió una importante lección:

“Nunca debes hablar con extraños”.
`
  },

  "tres-cerditos": {
    titulo: "Los Tres Cerditos",
    imagen: "./imagenCuentos/cerditos.jpeg",
    texto: `
En un pueblito no muy lejano, vivía una mamá cerdita junto con sus tres cerditos. Todos eran muy felices hasta que un día la mamá cerdita les dijo:

—Hijitos, ustedes ya han crecido, es tiempo de que sean cerditos adultos y vivan por sí mismos.

Antes de dejarlos ir, les dijo:

—En el mundo nada llega fácil, por lo tanto, deben aprender a trabajar para lograr sus sueños.

Mamá cerdita se despidió con un besito en la mejilla y los tres cerditos se fueron a vivir en el mundo.

El cerdito menor, que era muy, pero muy perezoso, no prestó atención a las palabras de mamá cerdita y decidió construir una casita de paja para terminar temprano y acostarse a descansar.

El cerdito del medio, que era medio perezoso, medio prestó atención a las palabras de mamá cerdita y construyó una casita de palos. La casita le quedó chueca porque como era medio perezoso no quiso leer las instrucciones para construirla.

La cerdita mayor, que era la más aplicada de todos, prestó mucha atención a las palabras de mamá cerdita y quiso construir una casita de ladrillos. La construcción de su casita le tomaría mucho más tiempo. Pero esto no le importó; su nuevo hogar la albergaría del frío y también del temible lobo feroz...

Y hablando del temible lobo feroz, este se encontraba merodeando por el bosque cuando vio al cerdito menor durmiendo tranquilamente a través de su ventana. Al lobo le entró un enorme apetito y pensó que el cerdito sería un muy delicioso bocadillo, así que tocó a la puerta y dijo:

—Cerdito, cerdito, déjame entrar.

El cerdito menor se despertó asustado y respondió:

—¡No, no y no!, nunca te dejaré entrar.

El lobo feroz se enfureció y dijo:

Soplaré y resoplaré y tu casa derribaré.

El lobo sopló y resopló con todas sus fuerzas y la casita de paja se vino al piso. Afortunadamente, el cerdito menor había escapado hacia la casa del cerdito del medio mientras el lobo seguía soplando.

El lobo feroz sintiéndose engañado, se dirigió a la casa del cerdito del medio y al tocar la puerta dijo:

—Cerdito, cerdito, déjame entrar.

El cerdito del medio respondió:

— ¡No, no y no!, nunca te dejaré entrar.

El lobo hambriento se enfureció y dijo:

—Soplaré y resoplaré y tu casa derribaré.

El lobo sopló y resopló con todas sus fuerzas y la casita de palo se vino abajo. Por suerte, los dos cerditos habían corrido hacia la casa de la cerdita mayor mientras que el lobo feroz seguía soplando y resoplando. Los dos hermanos, casi sin respiración le contaron toda la historia.

—Hermanitos, hace mucho frío y ustedes la han pasado muy mal, así que disfrutemos la noche al calor de la fogata —dijo la cerdita mayor y encendió la chimenea. Justo en ese momento, los tres cerditos escucharon que tocaban la puerta.

—Cerdita, cerdita, déjame entrar —dijo el lobo feroz.

La cerdita respondió:

— ¡No, no y no!, nunca te dejaré entrar.

El lobo hambriento se enfureció y dijo:

—Soplaré y soplaré y tu casa derribaré.

El lobo sopló y resopló con todas sus fuerzas, pero la casita de ladrillos resistía sus soplidos y resoplidos. Más enfurecido y hambriento que nunca decidió trepar el techo para meterse por la chimenea. Al bajar la chimenea, el lobo se quemó la cola con la fogata.

—¡AY! —gritó el lobo.

Y salió corriendo por el bosque para nunca más ser visto.

Un día cualquiera, mamá cerdita fue a visitar a sus queridos cerditos y descubrió que todos tres habían construido casitas de ladrillos. Los tres cerditos habían aprendido la lección:

“En el mundo nada llega fácil, por lo tanto, debemos trabajar para lograr nuestros sueños”.
`
  },

  "hansel-gretel": {
  titulo: "Hansel y Gretel",
  imagen: "./imagenCuentos/hansel-gretel.jpeg",
  texto: `
Un humilde leñador vivía con sus dos hijos y su nueva esposa en un bosque a las afueras del pueblo. El niño se llamaba Hansel y la niña, Gretel. Todos los días el leñador trabajaba sin descanso. Sin embargo, llegó un momento en el que no le alcanzaba para el sustento de su familia. Preocupado, el leñador le dijo a su esposa una noche:

—No tengo lo suficiente para comprar pan y mantequilla, ¿qué haré para alimentarnos y alimentar a los niños?

—Esto es lo que haremos —respondió la mujer—, mañana por la mañana, llevaré a Hansel y a Gretel a la entrada del pueblo y los dejaré ahí; una familia acaudalada se apiadará de ellos y vivirán una vida muy cómoda y feliz. Entonces, solo tendremos que preocuparnos por nosotros.

—Jamás lo permitiré —dijo el hombre—. ¿Cómo crees que puedo abandonar a mis hijos?

—Debes hacerlo —refutó la mujer—. Si no lo haces, todos vamos a tener hambre.

Los dos niños, incapaces de dormir por el hambre, habían escuchado la conversación. Llorando, Gretel le dijo a su hermano:

—Hansel, no puedo creer lo que hemos escuchado.

—No te preocupes Gretel —respondió Hansel con voz tranquila—. Tengo una idea.

Al amanecer, la malvada mujer despertó a sus dos hijastros gritando:

—¡Levántense ya, no sean flojos! Vamos al mercado a comprar alimentos.

Luego les dio a los pequeños un trozo de pan y les dijo:

—Este es el almuerzo; no se lo coman enseguida, porque no hay más.

Gretel guardó el pan en su delantal. Hansel puso el suyo en el bolsillo de su abrigo y lo desmenuzó en secreto; con cada paso que daba, arrojaba migas de pan en el camino.

—Espérenme aquí —dijo la madrastra cuando se encontraban en medio del bosque—, ya regreso.

Sin embargo, pasaron las horas sin que volvieran a saber de la mujer. Tan grande era su maldad que los había abandonado sin tomarse la molestia de dejarlos en el pueblo.

Hansel y Gretel se sentaron en la oscuridad y compartieron el pedazo de pan de Gretel. Pronto, los dos niños se quedaron dormidos. Cuando despertaron en medio de la noche, Gretel comenzó a llorar y dijo:

—¿Cómo encontraremos el camino a casa?

Hansel la consoló diciéndole:

—Espera a que salga la luna, luego seguiremos mi camino de migas hasta la casa.

Sin embargo, cuando salió la luna no pudieron seguir el camino, porque las aves del bosque se habían comido las migas. Los dos pequeños se encontraban perdidos.

Después de muchos días y noches de vagar por el bosque, los niños hallaron una casita hecha con pan de jengibre.

—¡Comamos! —dijo Hansel, mordisqueando el techo mientras Gretel probaba la ventana.

De repente, la puerta se abrió y una anciana salió cojeando apoyada en un bastón. Hansel y Gretel, asustados, dejaron caer los trozos de jengibre. La anciana sonrió amablemente y dijo:

—Soy una viejita muy solitaria. Qué alegría verlos.

La anciana los condujo al interior de su casa, les preparó una maravillosa cena y los llevó a dos camitas donde durmieron cómodamente. Pero la amable anciana era en realidad una bruja que usaba su casa para atrapar niños y convertirlos en muñecos de jengibre.

A la mañana siguiente, la bruja encerró a Hansel en una jaula mientras dormía. Luego despertó a Gretel y le dijo:

—Levántate floja y ayúdame a preparar el horno. ¡Voy a convertir a tu hermano en un muñeco de jengibre!

Gretel lloró al escucharla, pero obedeció. Cuando encendió el fuego del horno, la bruja le ordenó:

—Métete adentro y mira si está lo suficientemente caliente.

La bruja pensaba encerrarla también. Pero Gretel, que conocía sus intenciones, respondió:

—No sé cómo hacerlo, ¿cómo entro?

—La puerta es grande, mírame —dijo la bruja molesta.

Abrió la puerta del horno y metió medio cuerpo para mostrarle. En ese instante, Gretel cerró la puerta de golpe. La bruja quedó atrapada y en un instante se convirtió en un muñeco de jengibre.

Gretel liberó a Hansel. Al salir de la casa, Hansel tropezó con un baúl lleno de joyas. Los dos niños se llenaron los bolsillos de oro, perlas y diamantes. Felices, recorrieron el bosque hasta que vieron a su padre a lo lejos.

El angustiado leñador los abrazó con fuerza. Todos los días salía a buscarlos y había vivido atormentado. Ya no quiso saber más de su cruel esposa. Hansel le mostró las joyas y dijo:

—Mira papá, nunca más tendrás que cortar leña.

Y así, esta pequeña familia vivió feliz para siempre.
`
},
  "blancanieves": {
    titulo: "Blancanieves",
    imagen: "./imagenCuentos/blancanieves.jpeg",
    texto: `
Érase una vez una joven y bella princesa llamada Blancanieves que vivía en un reino muy lejano con su padre y madrastra.

Su madrastra, la reina, era también muy hermosa, pero arrogante y orgullosa. Se pasaba todo el día contemplándose frente al espejo. El espejo era mágico y cuando se paraba frente a él, le preguntaba:

—Espejito, espejito, ¿quién es la más hermosa del reino?

Entonces el espejo respondía:

— Tú eres la más hermosa de todas las mujeres.

La reina quedaba satisfecha, pues sabía que su espejo siempre decía la verdad. Sin embargo, con el pasar de los años, la belleza y bondad de Blancanieves se hacían más evidentes. Por todas sus buenas cualidades, superaba mucho la belleza física de la reina. Y llegó al fin un día en que la reina preguntó de nuevo:

—Espejito, espejito, ¿quién es la más hermosa del reino?

El espejo contestó:

—Blancanieves, a quien su bondad la hace ser aún más bella que tú.

La reina se llenó de ira y ordenó la presencia del cazador y le dijo:

—Llévate a la joven princesa al bosque y asegúrate de que las bestias salvajes se encarguen de ella.

Con engaños, el cazador llevó a Blancanieves al bosque, pero cuando estaba a punto de cumplir las órdenes de la reina, se apiadó de la bella joven y dijo:

—Corre, vete lejos, pobre muchacha. Busca un lugar seguro donde vivir.

Encontrándose sola en el gran bosque, Blancanieves corrió tan lejos como pudo hasta la llegada del anochecer. Entonces divisó una pequeña cabaña y entró en ella para dormir. Todo lo que había en la cabaña era pequeño. Había una mesa con un mantel blanco y siete platos pequeños, y con cada plato una cucharita. También, había siete pequeños cuchillos y tenedores, y siete jarritas llenas de agua. Contra la pared se hallaban siete pequeñas camas, una junto a la otra, cubiertas con colchas tan blancas como la nieve.

Blancanieves estaba tan hambrienta y sedienta que comió un poquito de vegetales y pan de cada platito y bebió una gota de cada jarrita. Luego, quiso acostarse en una de las camas, pero ninguna era de su medida, hasta que finalmente pudo acomodarse en la séptima.

Cuando ya había oscurecido, regresaron los dueños de la cabaña. Eran siete enanos que cavaban y extraían oro y piedras preciosas en las montañas. Ellos encendieron sus siete linternas, y observaron que alguien había estado en la cabaña, pues las cosas no se encontraban en el mismo lugar.

El primero dijo: —¿Quién se ha sentado en mi silla?

El segundo dijo: —¿Quién comió de mi plato?

El tercero dijo: —¿Quién mordió parte de mi pan?

El cuarto dijo: —¿Quién tomó parte de mis vegetales?

El quinto dijo: —¿Quién usó mi tenedor?

El sexto dijo: —¿Quién usó mi cuchillo?

El séptimo dijo: —¿Quién bebió de mi jarra?

Entonces el primero observó una arruga en su cama y dijo: —Alguien se ha metido en mi cama.

Y los demás fueron a revisar sus camas, diciendo: —Alguien ha estado en nuestras camas también.

Pero cuando el séptimo miró su cama, encontró a Blancanieves durmiendo plácidamente y llamó a los demás:

—¡Oh, cielos! —susurraron—. Qué encantadora muchacha

Cuando llegó el amanecer, Blancanieves se despertó muy asustada al ver a los siete enanos parados frente a ella. Pero los enanos eran muy amistosos y le preguntaron su nombre.

—Mi nombre es Blancanieves —respondió—, y les contó todo acerca de su malvada madrastra.

Los enanos dijeron:

—Si puedes limpiar nuestra casa, cocinar, tender las camas, lavar, coser y tejer, puedes quedarte todo el tiempo que quieras—. Blancanieves aceptó feliz y se quedó con ellos.

Pasó el tiempo y un día, la reina decidió consultar a su espejo y descubrió que la princesa vivía en el bosque. Furiosa, envenenó una manzana y tomó la apariencia de una anciana.

— Un bocado de esta manzana hará que Blancanieves duerma para siempre — dijo la malvada reina.

Al día siguiente, los enanos se marcharon a trabajar y Blancanieves se quedó sola.

Poco después, la reina disfrazada de anciana se acercó a la ventana de la cocina. La princesa le ofreció un vaso de agua.

—Eres muy bondadosa —dijo la anciana—. Toma esta manzana como gesto de agradecimiento.

En el momento en que Blancanieves mordió la manzana, cayó desplomada. Los enanos, alertados por los animales del bosque, llegaron a la cabaña mientras la reina huía. Con gran tristeza, colocaron a Blancanieves en una urna de cristal. Todos tenían la esperanza de que la hermosa joven despertase un día.

Y el día llegó cuando un apuesto príncipe que cruzaba el bosque en su caballo, vio a la hermosa joven en la urna de cristal y maravillado por su belleza, le dio un beso en la mejilla, la joven despertó al haberse roto el hechizo. Blancanieves y el príncipe se casaron y vivieron felices para siempre
`
  },

 // PARA DORMIR
"gigante-nubes": {
  titulo: "El Gato que Contaba Nubes",
  imagen: "./imagenCuentos/nubes-gato.jpeg", 
  texto: `
Había un gatito blanco que cada tarde se acostaba en el techo para mirar el cielo.  
No contaba ovejas, contaba nubes.

Una nube con forma de corazón.  
Una con forma de barco.  
Una que parecía una manta suave.

Cada vez que contaba diez nubes, le daba sueño.  
Antes de llegar a la quinta, el gatito ya dormía, arrullado por el viento.

Dicen que todavía sueña con formas nuevas que las nubes inventan para él.
`
},

"linterna-magica": {
  titulo: "La Linterna Mágica",
  imagen: "./imagenCuentos/linterna.jpeg",
  texto: `
Una niña encontró una linterna vieja en un cajón.  
Cuando la encendió, no salía luz normal:  
salían pequeñas estrellas que flotaban por la habitación.

Cada estrella susurraba:  
"Respirá..."  
"Soltá..."  
"Descansá..."

Las estrellas formaron un cielo propio sobre su cama.  
La niña cerró los ojos y se dejó llevar por su brillo suave.

Esa noche durmió profundamente mientras la linterna seguía encendida en silencio.
`
},

"arbol-secretos": {
  titulo: "El Árbol que Guardaba Secretos",
  imagen: "./imagenCuentos/arbol.jpeg",
  texto: `
En un bosque tranquilo había un árbol antiguo que sabía miles de historias.  
Cada noche, cuando todo estaba quieto, comenzaba a contarlas.

Las ardillas se acomodaban, los búhos cerraban un ojo,  
y los ciervos se recostaban en la hierba.

Su voz era tan calma que nadie alcanzaba a escuchar el final.  
Pero el árbol no se preocupaba:  
su misión era arrullar a quien lo escuchara.

Y así, cada noche, el bosque entero dormía bajo su voz.
`
},

"pluma-sueno": {
  titulo: "Ricitos de oro y los tres osos",
  imagen: "./imagenCuentos/ricitos.jpeg",
  texto: `
Había una vez una niña llamada Ricitos de Oro que paseaba por el bosque. Mientras caminaba, encontró una casita muy bonita. Como la puerta estaba entreabierta, decidió entrar.

En la mesa encontró tres tazones de sopa. Probó el primero:

—¡Ay, qué caliente!
Probó el segundo:
—¡Uy, qué frío!
Probó el tercero:
—¡Perfecto! —y se lo tomó todo.

Luego vio tres sillas. Se sentó en la primera:
—¡Qué dura!
En la segunda:
—¡Qué blanda!
En la tercera:
—¡Justo para mí! —pero la silla se rompió.

Cansada, subió al dormitorio y encontró tres camas. Probó la primera:
—¡Demasiado grande!
La segunda:
—¡Demasiado dura!
La tercera:
—¡Perfecta! —y se quedó dormida.

Al poco tiempo, llegaron los tres osos a su casa.
—¡Alguien tomó mi sopa! —dijo Papá Oso.
—¡Alguien tomó la mía! —dijo Mamá Osa.
—¡Alguien se tomó toda la mía! —exclamó el Osito.

Luego vieron las sillas:
—¡Alguien se sentó en mi silla!
—¡Y en la mía!
—¡Y rompió la mía! —lloró el Osito.

Subieron al dormitorio.
—¡Alguien durmió en mi cama! —dijo Papá Oso.
—¡Y en la mía! —dijo Mamá Osa.
—¡Y todavía está durmiendo en la mía! —dijo el Osito.

Ricitos de Oro despertó asustada, vio a los osos y salió corriendo del lugar. No volvió nunca más a entrar en una casa sin permiso.

Y así, los tres osos vivieron tranquilos para siempre.
`
  },
}
const CuentoDetalle = ({ id, volver }) => {
  
  const [reproduciendo, setReproduciendo] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
 
    audioRef.current = new Audio('/imagenCuentos/musicacuentos.mp3'); 
    audioRef.current.loop = true;   
    audioRef.current.volume = 0.3;  

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const alternarMusica = () => {
    if (reproduciendo) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Error audio:", e));
    }
    setReproduciendo(!reproduciendo);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const cuento = cuentosTexto[id];


  if (!cuento) {
    return (
      <div 
        className="cuento-detalle-container"
        style={{ backgroundImage: "url('/imagenCuentos/fondocuentodetalle.png')" }}
      >
        <div className="cuento-detalle-error">
          <h1>Cuento no encontrado 😢</h1>
          <p>El ID '{id}' no corresponde a ningún cuento.</p>
          <button onClick={volver} className="boton-volver">Volver a la lista</button>
        </div>
        
     
        <div className="mascota-widget">
          <img src="/imagenCuentos/seccioncuentodetalle.png" alt="Mascota Saltamontes" />
        </div>
      </div>
    );
  }

 
  return (
    <div 
      className="cuento-detalle-container"
      style={{ backgroundImage: "url('/imagenCuentos/fondocuentodetalle.png')" }}
    >
      
      <button onClick={volver} className="boton-volver">
        ← Volver a Cuentos
      </button>
      
      <h1 className="cuento-titulo">{cuento.titulo}</h1>

      <img 
        src={cuento.imagen} 
        alt={`Imagen de ${cuento.titulo}`} 
        className="cuento-imagen"
      />
      
      <div className="cuento-contenido">
        {cuento.texto.split('\n').map((parrafo, index) => (
          parrafo.trim() ? <p key={index}>{parrafo}</p> : null
        ))}
      </div>


      <div className="mascota-widget">
        <img 
          src="./imagenCuentos/seccioncuentodetalle.png" 
          alt="Saltamontes leyendo" 
        />
        <button onClick={alternarMusica} className="boton-musica">
          {reproduciendo ? '❚❚ Pausar' : '▶ Música'}
        </button>
        
      </div>

    </div>
  );
};

export default CuentoDetalle;