# Historias de Usuario - AniTec

<table>
  <thead>
    <tr>
      <th>Epic / Story ID</th>
      <th>Titulo</th>
      <th>Descripcion</th>
      <th>Criterios de Aceptacion</th>
      <th>Relacionado con</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>EP-002</b></td>
      <td>Dashboard del ganadero</td>
      <td>Esta epica agrupa las funcionalidades del panel principal del ganadero, donde se resumen sus fincas, animales, alertas sanitarias, actividades y datos financieros.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US-001</b></td>
      <td>Visualizar resumen operativo del ganadero</td>
      <td>Como ganadero, quiero ver un resumen de mis animales, fincas, alertas y actividades para conocer rapidamente el estado de mi operacion.</td>
      <td><b>Visualizacion de metricas del ganadero.</b><br>Given el ganadero tiene animales, fincas, actividades y registros sanitarios<br>When ingresa a su dashboard<br>Then el sistema muestra metricas calculadas con sus propios datos<br><br><b>Ganadero sin datos registrados.</b><br>Given el ganadero no tiene animales ni fincas registradas<br>When ingresa a su dashboard<br>Then el sistema muestra indicadores en cero o mensajes de estado vacio</td>
      <td>EP-002</td>
    </tr>
    <tr>
      <td><b>US-002</b></td>
      <td>Filtrar resumen por finca</td>
      <td>Como ganadero, quiero filtrar mi dashboard por finca para revisar el estado de una unidad productiva especifica.</td>
      <td><b>Seleccion de una finca.</b><br>Given el ganadero tiene mas de una finca registrada<br>When selecciona una finca especifica<br>Then el sistema actualiza los indicadores y listas usando solo los animales de esa finca<br><br><b>Seleccion de todas las fincas.</b><br>Given el ganadero esta revisando una finca especifica<br>When selecciona la opcion de todas las fincas<br>Then el sistema vuelve a mostrar la informacion agregada de todas sus fincas</td>
      <td>EP-002</td>
    </tr>
    <tr>
      <td><b>US-003</b></td>
      <td>Acceder a acciones rapidas del ganadero</td>
      <td>Como ganadero, quiero acceder rapidamente al registro de animales, incidencias y actividades para reducir pasos en tareas frecuentes.</td>
      <td><b>Registrar animal desde el dashboard.</b><br>Given el ganadero esta en su dashboard<br>When selecciona la accion de registrar animal<br>Then el sistema lo dirige al formulario de nuevo animal<br><br><b>Reportar incidencia desde el dashboard.</b><br>Given el ganadero detecta una enfermedad o problema sanitario<br>When selecciona la accion de reportar incidencia<br>Then el sistema lo dirige al formulario de evento sanitario<br><br><b>Programar visita desde el dashboard.</b><br>Given el ganadero necesita una visita o actividad futura<br>When selecciona la accion de programar visita<br>Then el sistema lo dirige al formulario de actividad</td>
      <td>EP-002</td>
    </tr>
    <tr>
      <td><b>EP-003</b></td>
      <td>Gestion de fincas del ganadero</td>
      <td>Esta epica agrupa las funcionalidades para registrar, consultar, editar y eliminar las fincas o unidades productivas del ganadero.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US-004</b></td>
      <td>Visualizar listado de fincas en cartas</td>
      <td>Como ganadero, quiero ver mis fincas en cartas con informacion relevante para identificar facilmente cada unidad productiva.</td>
      <td><b>Fincas existentes.</b><br>Given el ganadero tiene fincas registradas<br>When ingresa al apartado de fincas<br>Then el sistema muestra cada finca en una carta<br>And muestra nombre, ubicacion, tipo principal y cantidad de animales<br><br><b>Sin fincas registradas.</b><br>Given el ganadero no tiene fincas registradas<br>When ingresa al apartado de fincas<br>Then el sistema muestra un mensaje indicando que no hay fincas</td>
      <td>EP-003</td>
    </tr>
    <tr>
      <td><b>US-005</b></td>
      <td>Registrar nueva finca</td>
      <td>Como ganadero, quiero registrar una nueva finca para organizar mis animales por ubicacion o unidad productiva.</td>
      <td><b>Registro con datos validos.</b><br>Given el ganadero se encuentra en el formulario de nueva finca<br>When ingresa nombre, ubicacion y tipo principal validos<br>Then el sistema registra la finca<br>And la muestra en el listado de fincas<br><br><b>Registro incompleto.</b><br>Given el ganadero deja campos requeridos vacios<br>When intenta guardar la finca<br>Then el sistema no completa el registro<br>And solicita completar la informacion requerida</td>
      <td>EP-003</td>
    </tr>
    <tr>
      <td><b>US-006</b></td>
      <td>Editar informacion de una finca</td>
      <td>Como ganadero, quiero editar los datos de una finca para mantener actualizada su informacion.</td>
      <td><b>Edicion exitosa.</b><br>Given existe una finca registrada<br>When el ganadero modifica su nombre, ubicacion o tipo principal<br>Then el sistema guarda los cambios<br>And muestra la informacion actualizada<br><br><b>Finca inexistente.</b><br>Given la finca solicitada no existe<br>When el ganadero intenta editarla<br>Then el sistema redirige al listado de fincas</td>
      <td>EP-003</td>
    </tr>
    <tr>
      <td><b>US-007</b></td>
      <td>Eliminar finca</td>
      <td>Como ganadero, quiero eliminar una finca cuando ya no forma parte de mi operacion.</td>
      <td><b>Eliminacion confirmada.</b><br>Given existe una finca registrada<br>When el ganadero confirma su eliminacion<br>Then el sistema elimina la finca del listado<br><br><b>Eliminacion cancelada.</b><br>Given el ganadero abre la confirmacion de eliminacion<br>When cancela la accion<br>Then el sistema conserva la finca sin cambios</td>
      <td>EP-003</td>
    </tr>
    <tr>
      <td><b>EP-004</b></td>
      <td>Gestion de animales</td>
      <td>Esta epica agrupa las funcionalidades para registrar y administrar animales de distintos tipos de ganado, como bovinos, ovinos, caprinos, porcinos, aves, patos, pollos, cuyes y otros.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US-008</b></td>
      <td>Visualizar animales en cartas</td>
      <td>Como ganadero, quiero ver mis animales en cartas para revisar rapidamente la informacion principal de cada uno.</td>
      <td><b>Animales existentes.</b><br>Given el ganadero tiene animales registrados<br>When ingresa al apartado de animales<br>Then el sistema muestra una carta por animal<br>And muestra codigo, nombre, especie, raza, sexo, peso, estado y finca<br><br><b>Sin animales registrados.</b><br>Given el ganadero no tiene animales registrados<br>When ingresa al apartado de animales<br>Then el sistema muestra un mensaje de lista vacia</td>
      <td>EP-004</td>
    </tr>
    <tr>
      <td><b>US-009</b></td>
      <td>Buscar animales por texto</td>
      <td>Como ganadero, quiero buscar animales por nombre, codigo, especie o raza para encontrarlos rapidamente cuando tenga muchos registros.</td>
      <td><b>Busqueda con coincidencias.</b><br>Given existen animales registrados<br>When el ganadero escribe un termino de busqueda que coincide con uno o mas animales<br>Then el sistema muestra solo las cartas coincidentes<br><br><b>Busqueda sin coincidencias.</b><br>Given existen animales registrados<br>When el ganadero escribe un termino sin coincidencias<br>Then el sistema muestra un mensaje indicando que no se encontraron animales</td>
      <td>EP-004</td>
    </tr>
    <tr>
      <td><b>US-010</b></td>
      <td>Registrar animal</td>
      <td>Como ganadero, quiero registrar un animal indicando su especie y raza para mantener trazabilidad de mi ganado.</td>
      <td><b>Registro con datos validos.</b><br>Given el ganadero tiene al menos una finca registrada<br>When ingresa codigo, nombre, especie, raza, sexo, fecha de nacimiento, peso, estado y finca<br>Then el sistema registra el animal<br>And lo muestra en el listado correspondiente<br><br><b>Registro sin finca.</b><br>Given el ganadero no selecciona una finca<br>When intenta guardar el animal<br>Then el sistema solicita asociar el animal a una finca</td>
      <td>EP-004</td>
    </tr>
    <tr>
      <td><b>US-011</b></td>
      <td>Editar animal</td>
      <td>Como ganadero, quiero editar los datos de un animal para actualizar su estado, peso o informacion general.</td>
      <td><b>Edicion exitosa.</b><br>Given existe un animal registrado<br>When el ganadero modifica sus datos y guarda<br>Then el sistema actualiza el animal<br>And muestra la informacion actualizada en su carta<br><br><b>Animal inexistente.</b><br>Given el animal no existe<br>When el ganadero intenta abrir su formulario de edicion<br>Then el sistema redirige al listado de animales</td>
      <td>EP-004</td>
    </tr>
    <tr>
      <td><b>US-012</b></td>
      <td>Eliminar animal</td>
      <td>Como ganadero, quiero eliminar un animal cuando ya no pertenece a mi hato o registro productivo.</td>
      <td><b>Eliminacion confirmada.</b><br>Given existe un animal registrado<br>When el ganadero confirma la eliminacion<br>Then el sistema elimina el animal del listado<br><br><b>Eliminacion cancelada.</b><br>Given el ganadero abre la confirmacion de eliminacion<br>When cancela la accion<br>Then el animal permanece registrado</td>
      <td>EP-004</td>
    </tr>
    <tr>
      <td><b>US-013</b></td>
      <td>Consultar animales segun rol</td>
      <td>Como usuario, quiero que el sistema muestre animales segun mi rol para proteger la informacion de cada ganadero.</td>
      <td><b>Consulta como ganadero.</b><br>Given el usuario tiene rol de ganadero<br>When ingresa al apartado de animales<br>Then el sistema muestra solo los animales de sus fincas<br><br><b>Consulta como veterinario.</b><br>Given el usuario tiene rol de veterinario<br>When ingresa al apartado de animales o pacientes<br>Then el sistema muestra solo los animales de sus clientes asignados</td>
      <td>EP-004</td>
    </tr>
    <tr>
      <td><b>EP-005</b></td>
      <td>Gestion sanitaria y clinica</td>
      <td>Esta epica agrupa las funcionalidades para registrar enfermedades, incidencias, diagnosticos, tratamientos, recetas y seguimientos sanitarios de los animales.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US-014</b></td>
      <td>Visualizar registros sanitarios en cartas</td>
      <td>Como usuario autorizado, quiero ver los registros sanitarios en cartas para revisar de forma clara la informacion clinica de los animales.</td>
      <td><b>Registros existentes.</b><br>Given existen registros sanitarios asociados a animales visibles para el usuario<br>When ingresa a gestion sanitaria<br>Then el sistema muestra cada registro en una carta<br>And presenta animal, tipo, fecha, descripcion, veterinario y proxima fecha<br><br><b>Sin registros sanitarios.</b><br>Given no existen registros sanitarios visibles para el usuario<br>When ingresa a gestion sanitaria<br>Then el sistema muestra un mensaje de estado vacio</td>
      <td>EP-005</td>
    </tr>
    <tr>
      <td><b>US-015</b></td>
      <td>Registrar incidencia sanitaria como ganadero</td>
      <td>Como ganadero, quiero registrar enfermedades o incidencias basicas de mis animales para dejar constancia y facilitar el seguimiento veterinario.</td>
      <td><b>Registro de incidencia valido.</b><br>Given el ganadero selecciona un animal propio<br>When ingresa tipo, fecha, descripcion y datos de seguimiento<br>Then el sistema registra el evento sanitario para ese animal<br><br><b>Animal no disponible.</b><br>Given el animal pertenece a otro ganadero<br>When el ganadero intenta registrarle una incidencia<br>Then el sistema no lo muestra como opcion disponible</td>
      <td>EP-005</td>
    </tr>
    <tr>
      <td><b>US-016</b></td>
      <td>Registrar diagnostico y tratamiento como veterinario</td>
      <td>Como veterinario, quiero registrar diagnostico, tratamiento, receta y seguimiento para documentar la atencion clinica de un animal.</td>
      <td><b>Registro clinico completo.</b><br>Given el veterinario atiende a un animal de un cliente asignado<br>When ingresa diagnostico, tratamiento, receta, seguimiento y proxima fecha<br>Then el sistema guarda el registro sanitario<br>And lo asocia al animal correspondiente<br><br><b>Animal fuera de cartera.</b><br>Given un animal pertenece a un ganadero no asignado al veterinario<br>When el veterinario intenta registrar atencion sanitaria<br>Then el sistema no muestra ese animal como opcion</td>
      <td>EP-005</td>
    </tr>
    <tr>
      <td><b>US-017</b></td>
      <td>Editar registro sanitario</td>
      <td>Como usuario autorizado, quiero editar un registro sanitario para corregir o complementar informacion clinica.</td>
      <td><b>Edicion exitosa.</b><br>Given existe un registro sanitario visible para el usuario<br>When el usuario actualiza los datos y guarda<br>Then el sistema muestra el registro actualizado<br><br><b>Registro inexistente.</b><br>Given el registro sanitario no existe<br>When el usuario intenta editarlo<br>Then el sistema redirige a la lista de gestion sanitaria</td>
      <td>EP-005</td>
    </tr>
    <tr>
      <td><b>US-018</b></td>
      <td>Eliminar registro sanitario</td>
      <td>Como usuario autorizado, quiero eliminar un registro sanitario incorrecto para mantener limpio el historial.</td>
      <td><b>Eliminacion confirmada.</b><br>Given existe un registro sanitario<br>When el usuario confirma la eliminacion<br>Then el sistema elimina el registro del listado<br><br><b>Eliminacion cancelada.</b><br>Given el usuario abre la confirmacion de eliminacion<br>When cancela la accion<br>Then el registro permanece sin cambios</td>
      <td>EP-005</td>
    </tr>
    <tr>
      <td><b>US-019</b></td>
      <td>Consultar historial clinico por animal</td>
      <td>Como veterinario, quiero consultar el historial clinico de un animal para tomar mejores decisiones durante una atencion.</td>
      <td><b>Animal con historial.</b><br>Given el animal tiene registros sanitarios previos<br>When el veterinario abre su historial clinico<br>Then el sistema muestra todos los registros asociados al animal<br><br><b>Animal sin historial.</b><br>Given el animal no tiene registros sanitarios previos<br>When el veterinario abre su historial clinico<br>Then el sistema muestra un estado vacio o sin registros</td>
      <td>EP-005</td>
    </tr>
    <tr>
      <td><b>EP-006</b></td>
      <td>Gestion profesional del veterinario</td>
      <td>Esta epica agrupa las funcionalidades para que el veterinario administre su cartera de clientes ganaderos, consulte sus fincas, revise pacientes y mantenga seguimiento sanitario.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US-020</b></td>
      <td>Visualizar dashboard profesional del veterinario</td>
      <td>Como veterinario, quiero ver un dashboard profesional para revisar clientes, pacientes activos, registros clinicos y seguimientos pendientes.</td>
      <td><b>Veterinario con clientes asignados.</b><br>Given el veterinario tiene ganaderos asignados<br>When ingresa a su dashboard<br>Then el sistema muestra clientes activos, pacientes, registros clinicos y seguimientos<br><br><b>Veterinario sin clientes asignados.</b><br>Given el veterinario no tiene ganaderos asignados<br>When ingresa a su dashboard<br>Then el sistema muestra metricas en cero y permite agregar clientes</td>
      <td>EP-006</td>
    </tr>
    <tr>
      <td><b>US-021</b></td>
      <td>Seleccionar cliente en el dashboard veterinario</td>
      <td>Como veterinario, quiero seleccionar un cliente ganadero para revisar sus fincas y animales antes de realizar acciones clinicas.</td>
      <td><b>Seleccion de cliente valido.</b><br>Given el veterinario tiene clientes asignados<br>When selecciona un cliente en el panel<br>Then el sistema muestra las fincas de ese cliente<br>And muestra la cantidad de animales por finca<br><br><b>Cliente sin fincas.</b><br>Given el cliente seleccionado no tiene fincas registradas<br>When el veterinario lo selecciona<br>Then el sistema muestra un mensaje indicando que no hay fincas</td>
      <td>EP-006</td>
    </tr>
    <tr>
      <td><b>US-022</b></td>
      <td>Visualizar clientes asignados en cartas</td>
      <td>Como veterinario, quiero ver mis clientes en cartas con informacion completa para entender rapidamente la situacion de cada ganadero.</td>
      <td><b>Clientes existentes.</b><br>Given el veterinario tiene clientes asignados<br>When ingresa a clientes asignados<br>Then el sistema muestra cartas con nombre, fincas, ubicacion, animales, especies, registros sanitarios y alertas<br><br><b>Sin clientes.</b><br>Given el veterinario no tiene clientes asignados<br>When ingresa a clientes asignados<br>Then el sistema muestra un mensaje indicando que no tiene clientes</td>
      <td>EP-006</td>
    </tr>
    <tr>
      <td><b>US-023</b></td>
      <td>Agregar cliente ganadero a la cartera del veterinario</td>
      <td>Como veterinario, quiero buscar ganaderos registrados y enviar una peticion para agregarlos a mi cartera de clientes.</td>
      <td><b>Busqueda de ganadero.</b><br>Given existen ganaderos registrados en la aplicacion<br>When el veterinario ingresa al panel de agregar cliente<br>Then el sistema muestra ganaderos en cartas con nombre, fincas y avatar circular<br><br><b>Envio de peticion simulada.</b><br>Given el veterinario encuentra un ganadero disponible<br>When selecciona enviar peticion<br>Then el sistema asigna automaticamente ese ganadero al veterinario<br>And lo muestra como cliente agregado<br><br><b>Busqueda sin resultados.</b><br>Given el veterinario escribe un nombre sin coincidencias<br>When el sistema filtra los ganaderos<br>Then muestra un mensaje indicando que no se encontraron ganaderos</td>
      <td>EP-006</td>
    </tr>
    <tr>
      <td><b>US-024</b></td>
      <td>Eliminar cliente de la cartera del veterinario</td>
      <td>Como veterinario, quiero eliminar un cliente de mi lista para dejar de visualizar sus datos ganaderos y sanitarios.</td>
      <td><b>Eliminacion de relacion veterinario-cliente.</b><br>Given el veterinario tiene un cliente asignado<br>When selecciona eliminar cliente<br>Then el sistema elimina la relacion entre veterinario y ganadero<br>And el cliente deja de aparecer en su lista<br><br><b>Datos del ganadero se conservan.</b><br>Given el veterinario elimina un cliente de su cartera<br>When el sistema procesa la accion<br>Then las fincas, animales y registros del ganadero se conservan en la aplicacion</td>
      <td>EP-006</td>
    </tr>
    <tr>
      <td><b>US-025</b></td>
      <td>Consultar pacientes por ganadero</td>
      <td>Como veterinario, quiero seleccionar un cliente y ver sus animales para atenderlos de forma organizada.</td>
      <td><b>Cliente con animales.</b><br>Given el veterinario selecciona un cliente con animales registrados<br>When ingresa al apartado de pacientes<br>Then el sistema muestra las cartas de animales de ese cliente<br><br><b>Filtrado por finca.</b><br>Given el cliente tiene mas de una finca<br>When el veterinario selecciona una finca especifica<br>Then el sistema muestra solo los animales de esa finca</td>
      <td>EP-006</td>
    </tr>
    <tr>
      <td><b>US-026</b></td>
      <td>Acceder al historial de un paciente</td>
      <td>Como veterinario, quiero abrir el historial clinico desde la carta del paciente para revisar sus atenciones anteriores.</td>
      <td><b>Acceso desde pacientes.</b><br>Given el veterinario esta visualizando los animales de un cliente<br>When selecciona ver historial en una carta de animal<br>Then el sistema abre el historial clinico del animal seleccionado<br><br><b>Paciente sin registros.</b><br>Given el animal no tiene registros clinicos<br>When el veterinario abre su historial<br>Then el sistema muestra que aun no existen atenciones registradas</td>
      <td>EP-006</td>
    </tr>
    <tr>
      <td><b>EP-007</b></td>
      <td>Calendario, actividades y recordatorios</td>
      <td>Esta epica agrupa las funcionalidades para registrar y consultar actividades productivas, sanitarias, financieras, reproductivas y visitas veterinarias.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US-027</b></td>
      <td>Visualizar calendario de actividades</td>
      <td>Como usuario, quiero ver mis actividades programadas para organizar tareas ganaderas y sanitarias.</td>
      <td><b>Actividades existentes.</b><br>Given existen actividades visibles para el usuario<br>When ingresa al apartado de actividades<br>Then el sistema muestra una lista cronologica con fecha, titulo, tipo, estado y prioridad<br><br><b>Sin actividades.</b><br>Given no existen actividades visibles para el usuario<br>When ingresa al apartado de actividades<br>Then el sistema muestra un mensaje indicando que no hay actividades programadas</td>
      <td>EP-007</td>
    </tr>
    <tr>
      <td><b>US-028</b></td>
      <td>Crear actividad o recordatorio</td>
      <td>Como usuario, quiero crear actividades para programar controles, visitas, tareas productivas o recordatorios financieros.</td>
      <td><b>Actividad valida.</b><br>Given el usuario ingresa titulo, tipo, fecha, prioridad y estado<br>When guarda la actividad<br>Then el sistema registra la actividad<br>And la muestra en el calendario<br><br><b>Actividad incompleta.</b><br>Given el usuario no ingresa titulo o fecha<br>When intenta guardar la actividad<br>Then el sistema solicita completar los datos requeridos</td>
      <td>EP-007</td>
    </tr>
    <tr>
      <td><b>US-029</b></td>
      <td>Editar evento</td>
      <td>Como usuario, quiero editar un evento para actualizar fecha, prioridad o estado.</td>
      <td><b>Edicion exitosa.</b><br>Given existe un evento registrado<br>When el usuario modifica sus datos y guarda<br>Then el sistema actualiza el evento en el calendario<br><br><b>Evento inexistente.</b><br>Given el evento no existe<br>When el usuario intenta editarlo<br>Then el sistema redirige al calendario</td>
      <td>EP-007</td>
    </tr>
    <tr>
      <td><b>US-030</b></td>
      <td>Eliminar actividad</td>
      <td>Como usuario, quiero eliminar actividades que ya no son necesarias para mantener mi calendario ordenado.</td>
      <td><b>Eliminacion confirmada.</b><br>Given existe una actividad registrada<br>When el usuario confirma la eliminacion<br>Then el sistema elimina la actividad<br><br><b>Eliminacion cancelada.</b><br>Given el usuario abre la confirmacion de eliminacion<br>When cancela la accion<br>Then la actividad permanece registrada</td>
      <td>EP-007</td>
    </tr>
    <tr>
      <td><b>EP-008</b></td>
      <td>Gestion financiera del ganadero</td>
      <td>Esta epica agrupa las funcionalidades financieras para que el ganadero registre ingresos, egresos y revise su balance.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US-031</b></td>
      <td>Visualizar movimientos financieros</td>
      <td>Como ganadero, quiero ver mis ingresos, egresos y balance para controlar la rentabilidad de mi operacion.</td>
      <td><b>Movimientos existentes.</b><br>Given el ganadero tiene movimientos financieros registrados<br>When ingresa al apartado de finanzas<br>Then el sistema muestra ingresos, egresos, balance y detalle de movimientos<br><br><b>Sin movimientos.</b><br>Given el ganadero no tiene movimientos financieros<br>When ingresa al apartado de finanzas<br>Then el sistema muestra valores en cero o una lista vacia</td>
      <td>EP-008</td>
    </tr>
    <tr>
      <td><b>US-032</b></td>
      <td>Registrar movimiento financiero</td>
      <td>Como ganadero, quiero registrar ingresos y egresos para mantener actualizado mi balance mensual.</td>
      <td><b>Registro de ingreso.</b><br>Given el ganadero vende productos o animales<br>When registra un movimiento de tipo ingreso con categoria, monto, fecha y descripcion<br>Then el sistema suma el monto a los ingresos<br><br><b>Registro de egreso.</b><br>Given el ganadero realiza un gasto operativo<br>When registra un movimiento de tipo egreso con categoria, monto, fecha y descripcion<br>Then el sistema suma el monto a los egresos</td>
      <td>EP-008</td>
    </tr>
    <tr>
      <td><b>US-033</b></td>
      <td>Editar movimiento financiero</td>
      <td>Como ganadero, quiero editar un movimiento financiero para corregir montos, categorias o fechas.</td>
      <td><b>Edicion exitosa.</b><br>Given existe un movimiento financiero<br>When el ganadero modifica sus datos y guarda<br>Then el sistema actualiza el movimiento<br>And recalcula los totales financieros<br><br><b>Movimiento inexistente.</b><br>Given el movimiento no existe<br>When el ganadero intenta editarlo<br>Then el sistema redirige al listado financiero</td>
      <td>EP-008</td>
    </tr>
    <tr>
      <td><b>US-034</b></td>
      <td>Eliminar movimiento financiero</td>
      <td>Como ganadero, quiero eliminar un movimiento incorrecto para mantener mi balance limpio.</td>
      <td><b>Eliminacion confirmada.</b><br>Given existe un movimiento financiero<br>When el ganadero confirma la eliminacion<br>Then el sistema elimina el movimiento<br>And recalcula ingresos, egresos y balance<br><br><b>Eliminacion cancelada.</b><br>Given el ganadero abre la confirmacion de eliminacion<br>When cancela la accion<br>Then el movimiento permanece registrado</td>
      <td>EP-008</td>
    </tr>
    <tr>
      <td><b>EP-009</b></td>
      <td>Analiticas y estadisticas</td>
      <td>Esta epica agrupa las funcionalidades para visualizar metricas y graficos estadisticos basados en animales, fincas, clientes y registros sanitarios visibles para cada rol.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US-035</b></td>
      <td>Visualizar analiticas del ganadero</td>
      <td>Como ganadero, quiero ver analiticas basadas en mis propios animales, fincas y registros sanitarios para tomar decisiones sobre el estado sanitario y productivo de mi hato.</td>
      <td><b>Analitica con datos propios.</b><br>Given el ganadero tiene animales, fincas y registros sanitarios registrados<br>When ingresa al apartado de analiticas<br>Then el sistema muestra metricas calculadas solo con sus datos<br><br><b>Analitica sin datos.</b><br>Given el ganadero no tiene informacion registrada<br>When ingresa al apartado de analiticas<br>Then el sistema muestra metricas en cero o graficos con estado sin datos</td>
      <td>EP-009</td>
    </tr>
    <tr>
      <td><b>US-036</b></td>
      <td>Visualizar analiticas del veterinario</td>
      <td>Como veterinario, quiero ver analiticas sanitarias de mis clientes asignados para priorizar pacientes, seguimientos y atenciones por hato.</td>
      <td><b>Analitica con clientes asignados.</b><br>Given el veterinario tiene clientes asignados<br>When ingresa al apartado de analiticas<br>Then el sistema muestra metricas de clientes, pacientes monitoreados, registros sanitarios y seguimientos pendientes<br><br><b>Graficos sanitarios del veterinario.</b><br>Given existen registros sanitarios de animales bajo supervision del veterinario<br>When visualiza analiticas<br>Then el sistema muestra graficos de registros por tipo y atenciones por hato</td>
      <td>EP-009</td>
    </tr>
    <tr>
      <td><b>US-037</b></td>
      <td>Visualizar estado sanitario del hato</td>
      <td>Como ganadero, quiero ver un grafico del estado de mis animales para identificar cuantos estan saludables, en observacion o en tratamiento.</td>
      <td><b>Grafico con animales registrados.</b><br>Given el ganadero tiene animales registrados con diferentes estados<br>When ingresa a analiticas<br>Then el sistema muestra un grafico de estado del hato con animales saludables, en observacion y en tratamiento<br><br><b>Grafico sin animales.</b><br>Given el ganadero no tiene animales registrados<br>When ingresa a analiticas<br>Then el sistema muestra el grafico sin datos o con valores en cero</td>
      <td>EP-009</td>
    </tr>
    <tr>
      <td><b>US-038</b></td>
      <td>Visualizar registros sanitarios por tipo</td>
      <td>Como usuario autorizado, quiero ver los registros sanitarios agrupados por tipo para entender que atenciones son mas frecuentes.</td>
      <td><b>Registros sanitarios existentes.</b><br>Given existen registros sanitarios visibles para el usuario<br>When ingresa al apartado de analiticas<br>Then el sistema muestra un grafico con tipos como incidencia, vacuna, revision, tratamiento y diagnostico<br><br><b>Sin registros sanitarios.</b><br>Given no existen registros sanitarios visibles para el usuario<br>When visualiza el grafico<br>Then el sistema muestra valores en cero o una representacion sin datos</td>
      <td>EP-009</td>
    </tr>
    <tr>
      <td><b>US-039</b></td>
      <td>Visualizar atenciones sanitarias por hato</td>
      <td>Como veterinario, quiero ver las atenciones sanitarias por hato para identificar que clientes requieren mas seguimiento.</td>
      <td><b>Atenciones agrupadas por hato.</b><br>Given el veterinario tiene clientes con hatos y registros sanitarios<br>When ingresa a analiticas<br>Then el sistema muestra un grafico con la cantidad de atenciones sanitarias por hato<br><br><b>Cliente sin atenciones.</b><br>Given un hato no tiene registros sanitarios asociados<br>When se generan las analiticas<br>Then el sistema muestra ese hato con valor cero o sin atenciones registradas</td>
      <td>EP-009</td>
    </tr>
    <tr>
      <td><b>EP-010</b></td>
      <td>Navegacion y experiencia compartida</td>
      <td>Esta epica agrupa funcionalidades generales de navegacion, estructura visual, estados vacios y paginas compartidas por los usuarios.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US-040</b></td>
      <td>Navegar mediante menu lateral segun rol</td>
      <td>Como usuario autenticado, quiero ver un menu lateral adaptado a mi rol para acceder rapidamente a las secciones disponibles.</td>
      <td><b>Menu del ganadero.</b><br>Given el usuario tiene rol de ganadero<br>When se muestra el layout principal<br>Then el menu incluye panel ganadero, fincas, animales, sanidad, actividades, finanzas y analiticas<br><br><b>Menu del veterinario.</b><br>Given el usuario tiene rol de veterinario<br>When se muestra el layout principal<br>Then el menu incluye panel veterinario, clientes, pacientes, sanidad, actividades y analiticas</td>
      <td>EP-010</td>
    </tr>
    <tr>
      <td><b>US-041</b></td>
      <td>Visualizar pagina de inicio interna</td>
      <td>Como usuario autenticado, quiero ver una pagina de inicio operativa para acceder a modulos principales y obtener un resumen general.</td>
      <td><b>Inicio con datos disponibles.</b><br>Given el usuario tiene datos registrados<br>When ingresa a la pagina de inicio interna<br>Then el sistema muestra accesos y resumen operativo<br><br><b>Inicio sin datos.</b><br>Given el usuario aun no tiene datos registrados<br>When ingresa a la pagina de inicio interna<br>Then el sistema muestra accesos principales para comenzar</td>
      <td>EP-010</td>
    </tr>
    <tr>
      <td><b>US-042</b></td>
      <td>Visualizar pagina acerca de AniTec</td>
      <td>Como usuario, quiero consultar informacion acerca de AniTec para entender el proposito de la aplicacion.</td>
      <td><b>Acceso a la pagina acerca de.</b><br>Given el usuario navega a la seccion acerca de<br>When la pagina carga<br>Then el sistema muestra una descripcion de AniTec y sus modulos principales</td>
      <td>EP-010</td>
    </tr>
    <tr>
      <td><b>US-043</b></td>
      <td>Visualizar pagina no encontrada</td>
      <td>Como usuario, quiero ver un mensaje claro cuando ingreso a una ruta no disponible para saber que no existe contenido asociado.</td>
      <td><b>Ruta invalida.</b><br>Given el usuario ingresa una URL inexistente<br>When el sistema no encuentra una ruta asociada<br>Then muestra la pagina no encontrada<br>And permite volver a una ruta valida</td>
      <td>EP-010</td>
    </tr>
    <tr>
      <td><b>EP-011</b></td>
      <td>Landing page publica de AniTec</td>
      <td>Esta epica agrupa las historias de usuario de la landing page publica de AniTec. Estas historias estan al final porque corresponden a la experiencia informativa y comercial previa al uso de la aplicacion web.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US-044</b></td>
      <td>Visualizar pagina principal de la landing page</td>
      <td>Como visitante, quiero ver la pagina principal de AniTec para comprender rapidamente que ofrece la plataforma.</td>
      <td><b>Carga de pagina principal.</b><br>Given el visitante ingresa a la landing page principal<br>When la pagina carga<br>Then el sistema muestra el logo, navegacion, hero principal, propuesta de valor y llamados a la accion<br><br><b>Navegacion hacia secciones internas.</b><br>Given el visitante esta en la pagina principal<br>When selecciona una opcion del menu<br>Then el sistema lo dirige a la seccion o pagina correspondiente</td>
      <td>EP-011</td>
    </tr>
    <tr>
      <td><b>US-045</b></td>
      <td>Conocer beneficios generales de AniTec</td>
      <td>Como visitante, quiero revisar los beneficios generales de AniTec para evaluar si la plataforma resuelve mis necesidades de gestion ganadera.</td>
      <td><b>Visualizacion de beneficios.</b><br>Given el visitante navega a la seccion de beneficios o caracteristicas<br>When la seccion se muestra<br>Then el sistema presenta beneficios relacionados con gestion ganadera, sanidad, productividad y trazabilidad<br><br><b>Revision desde dispositivo movil.</b><br>Given el visitante usa un dispositivo movil<br>When visualiza los beneficios<br>Then el contenido se adapta al tamano de pantalla sin perder legibilidad</td>
      <td>EP-011</td>
    </tr>
    <tr>
      <td><b>US-046</b></td>
      <td>Visualizar pagina para ganaderos</td>
      <td>Como ganadero visitante, quiero acceder a una pagina orientada a mi perfil para entender como AniTec mejora mi gestion diaria.</td>
      <td><b>Carga de pagina para ganaderos.</b><br>Given el visitante selecciona la pagina para ganaderos<br>When la pagina carga<br>Then el sistema muestra informacion sobre gestion de animales, sanidad, productividad, finanzas y alertas<br><br><b>Revision de comparacion tradicional vs AniTec.</b><br>Given el visitante esta en la pagina para ganaderos<br>When llega a la seccion comparativa<br>Then el sistema muestra diferencias entre la gestion tradicional y la gestion con AniTec</td>
      <td>EP-011</td>
    </tr>
    <tr>
      <td><b>US-047</b></td>
      <td>Visualizar pagina para veterinarios</td>
      <td>Como veterinario visitante, quiero acceder a una pagina orientada a mi perfil para entender como AniTec apoya la gestion de clientes y pacientes.</td>
      <td><b>Carga de pagina para veterinarios.</b><br>Given el visitante selecciona la pagina para veterinarios<br>When la pagina carga<br>Then el sistema muestra informacion sobre clientes, pacientes, historiales clinicos, visitas y analiticas sanitarias<br><br><b>Revision de flujo profesional.</b><br>Given el visitante esta en la pagina para veterinarios<br>When revisa las secciones de uso<br>Then el sistema explica como el veterinario puede organizar su cartera y atenciones</td>
      <td>EP-011</td>
    </tr>
    <tr>
      <td><b>US-048</b></td>
      <td>Visualizar pagina nosotros</td>
      <td>Como visitante, quiero conocer al equipo y la propuesta de AniTec para confiar en la solucion.</td>
      <td><b>Carga de pagina nosotros.</b><br>Given el visitante selecciona la pagina nosotros<br>When la pagina carga<br>Then el sistema muestra informacion institucional, proposito y contexto del producto</td>
      <td>EP-011</td>
    </tr>
    <tr>
      <td><b>US-049</b></td>
      <td>Cambiar idioma en la landing page</td>
      <td>Como visitante, quiero cambiar el idioma de la landing page para leer la informacion en mi idioma preferido.</td>
      <td><b>Cambio a espanol.</b><br>Given la landing page esta en ingles<br>When el visitante selecciona espanol<br>Then el sistema actualiza los textos disponibles a espanol<br><br><b>Cambio a ingles.</b><br>Given la landing page esta en espanol<br>When el visitante selecciona ingles<br>Then el sistema actualiza los textos disponibles a ingles</td>
      <td>EP-011</td>
    </tr>
    <tr>
      <td><b>US-050</b></td>
      <td>Consultar testimonios de usuarios</td>
      <td>Como visitante, quiero leer testimonios de ganaderos o veterinarios para conocer experiencias de uso de AniTec.</td>
      <td><b>Testimonios visibles.</b><br>Given el visitante navega a una pagina con testimonios<br>When llega a la seccion de testimonios<br>Then el sistema muestra comentarios, nombres e imagenes de usuarios representativos</td>
      <td>EP-011</td>
    </tr>
    <tr>
      <td><b>US-051</b></td>
      <td>Acceder a contacto o llamada a la accion</td>
      <td>Como visitante interesado, quiero encontrar facilmente una llamada a la accion o datos de contacto para dar el siguiente paso con AniTec.</td>
      <td><b>Acceso a contacto desde navegacion.</b><br>Given el visitante esta en la landing page<br>When selecciona la opcion de contacto<br>Then el sistema lo desplaza o redirige al bloque de contacto<br><br><b>Acceso desde CTA.</b><br>Given el visitante lee la propuesta de valor<br>When selecciona un boton de llamada a la accion<br>Then el sistema lo dirige a la seccion definida para iniciar contacto o conocer mas</td>
      <td>EP-011</td>
    </tr>
    <tr>
      <td><b>US-052</b></td>
      <td>Visualizar landing page en dispositivos moviles</td>
      <td>Como visitante movil, quiero navegar la landing page desde mi celular para conocer AniTec sin problemas de visualizacion.</td>
      <td><b>Menu movil.</b><br>Given el visitante abre la landing page desde un dispositivo movil<br>When selecciona el boton de menu<br>Then el sistema muestra las opciones de navegacion adaptadas a pantalla pequena<br><br><b>Contenido responsive.</b><br>Given el visitante navega por la landing page desde movil<br>When revisa imagenes, textos y tarjetas<br>Then el contenido se adapta sin cortes, solapamientos ni perdida de legibilidad</td>
      <td>EP-011</td>
    </tr>
    <tr>
      <td><b>EP-001</b></td>
      <td>Gestion de acceso, sesion y roles</td>
      <td>Esta epica agrupa las funcionalidades necesarias para que los usuarios ingresen a AniTec con una identidad determinada y accedan a una experiencia diferenciada segun su rol de ganadero o veterinario.</td>
      <td>No aplica</td>
      <td>No aplica</td>
    </tr>
    <tr>
      <td><b>US-053</b></td>
      <td>Iniciar sesion como usuario registrado</td>
      <td>Como usuario registrado, quiero iniciar sesion con mis credenciales para acceder a las funcionalidades que corresponden a mi rol.</td>
      <td><b>Inicio de sesion con credenciales validas.</b><br>Given el usuario se encuentra en la pantalla de inicio de sesion<br>And ingresa un usuario y contrasena validos<br>When selecciona la opcion de ingresar<br>Then el sistema autentica al usuario<br>And redirige al dashboard correspondiente segun su rol<br><br><b>Inicio de sesion con credenciales invalidas.</b><br>Given el usuario se encuentra en la pantalla de inicio de sesion<br>And ingresa un usuario o contrasena incorrectos<br>When selecciona la opcion de ingresar<br>Then el sistema no permite el acceso<br>And muestra un mensaje de credenciales invalidas</td>
      <td>EP-001</td>
    </tr>
    <tr>
      <td><b>US-054</b></td>
      <td>Redirigir al dashboard del rol correspondiente</td>
      <td>Como usuario autenticado, quiero ser enviado al panel correcto para usar solo las funciones propias de mi perfil.</td>
      <td><b>Acceso como ganadero.</b><br>Given el usuario autenticado tiene rol de ganadero<br>When el inicio de sesion se completa correctamente<br>Then el sistema lo redirige al dashboard ganadero<br><br><b>Acceso como veterinario.</b><br>Given el usuario autenticado tiene rol de veterinario<br>When el inicio de sesion se completa correctamente<br>Then el sistema lo redirige al dashboard veterinario</td>
      <td>EP-001</td>
    </tr>
    <tr>
      <td><b>US-055</b></td>
      <td>Restringir rutas segun rol</td>
      <td>Como usuario autenticado, quiero que el sistema me permita acceder solo a las secciones correspondientes a mi rol para evitar operaciones que no me pertenecen.</td>
      <td><b>Ganadero intenta acceder a una ruta de veterinario.</b><br>Given el usuario autenticado tiene rol de ganadero<br>When intenta ingresar a una ruta exclusiva de veterinarios<br>Then el sistema bloquea el acceso<br>And lo redirige a su dashboard ganadero<br><br><b>Veterinario intenta acceder a una ruta exclusiva de finanzas ganaderas.</b><br>Given el usuario autenticado tiene rol de veterinario<br>When intenta acceder a una ruta exclusiva del ganadero<br>Then el sistema bloquea el acceso<br>And lo redirige a su dashboard veterinario</td>
      <td>EP-001</td>
    </tr>
    <tr>
      <td><b>US-056</b></td>
      <td>Cerrar sesion</td>
      <td>Como usuario autenticado, quiero cerrar sesion para proteger mi informacion cuando deje de usar la aplicacion.</td>
      <td><b>Cierre de sesion exitoso.</b><br>Given el usuario tiene una sesion activa<br>When selecciona la opcion de salir<br>Then el sistema elimina la sesion activa<br>And redirige al usuario a la pantalla de inicio de sesion<br><br><b>Intento de acceso posterior al cierre de sesion.</b><br>Given el usuario cerro sesion<br>When intenta acceder a una ruta privada<br>Then el sistema solicita iniciar sesion nuevamente</td>
      <td>EP-001</td>
    </tr>
    <tr>
      <td><b>US-057</b></td>
      <td>Cambiar idioma de la interfaz</td>
      <td>Como usuario, quiero cambiar el idioma de la interfaz para utilizar la aplicacion en el idioma que prefiera.</td>
      <td><b>Seleccion de idioma espanol.</b><br>Given el usuario visualiza la aplicacion en otro idioma<br>When selecciona la opcion ES<br>Then el sistema muestra los textos de la interfaz en espanol<br><br><b>Seleccion de idioma ingles.</b><br>Given el usuario visualiza la aplicacion en espanol<br>When selecciona la opcion EN<br>Then el sistema muestra los textos disponibles en ingles</td>
      <td>EP-001</td>
    </tr>
    <tr>
      <td><b>TS-001</b></td>
      <td>Configuracion inicial del frontend con Vue, Vite y PrimeVue</td>
      <td>Como desarrollador frontend, quiero configurar la base del proyecto con Vue, Vite y PrimeVue para construir una aplicacion web modular, rapida y con componentes reutilizables.</td>
      <td><b>Proyecto ejecutable.</b><br>Given el proyecto frontend esta configurado<br>When se ejecuta npm run dev<br>Then la aplicacion inicia correctamente en el navegador<br><br><b>Compilacion correcta.</b><br>Given el codigo fuente esta completo<br>When se ejecuta npm run build<br>Then Vite genera la version de produccion sin errores de compilacion</td>
      <td>EP-010</td>
    </tr>
    <tr>
      <td><b>TS-002</b></td>
      <td>Configuracion de rutas protegidas por rol con Vue Router</td>
      <td>Como desarrollador frontend, quiero configurar rutas publicas y privadas con validacion por rol para controlar el acceso de ganaderos y veterinarios.</td>
      <td><b>Ruta privada sin sesion.</b><br>Given un usuario no autenticado intenta entrar a una ruta privada<br>When el router evalua la navegacion<br>Then el sistema lo redirige al inicio de sesion<br><br><b>Ruta restringida por rol.</b><br>Given un usuario autenticado intenta acceder a una ruta de otro rol<br>When el router valida los roles permitidos<br>Then el sistema lo redirige a su dashboard correspondiente</td>
      <td>EP-001</td>
    </tr>
    <tr>
      <td><b>TS-003</b></td>
      <td>Manejo de estado global con Pinia</td>
      <td>Como desarrollador frontend, quiero manejar los datos principales mediante stores de Pinia para compartir informacion entre vistas sin repetir logica.</td>
      <td><b>Datos compartidos.</b><br>Given una vista carga animales, fincas, actividades o registros sanitarios<br>When otra vista necesita esos datos<br>Then puede obtenerlos desde el store correspondiente<br><br><b>Actualizacion del estado.</b><br>Given el usuario crea, edita o elimina un registro<br>When el store procesa la accion<br>Then la informacion visible se actualiza en la interfaz</td>
      <td>EP-002, EP-003, EP-004, EP-005, EP-006, EP-007, EP-008, EP-009</td>
    </tr>
    <tr>
      <td><b>TS-004</b></td>
      <td>Consumo de datos mediante Axios, BaseApi y BaseEndpoint</td>
      <td>Como desarrollador frontend, quiero centralizar el consumo de datos con Axios, BaseApi y BaseEndpoint para evitar repetir codigo de peticiones en cada modulo.</td>
      <td><b>Consulta de datos.</b><br>Given un store solicita informacion de un modulo<br>When llama a su clase API correspondiente<br>Then el sistema usa BaseEndpoint para obtener los datos del endpoint configurado<br><br><b>Operacion sobre registros.</b><br>Given el usuario crea, actualiza o elimina un registro<br>When el store llama a la API<br>Then se ejecuta la peticion correspondiente usando la estructura comun de endpoints</td>
      <td>EP-003, EP-004, EP-005, EP-006, EP-007, EP-008, EP-009</td>
    </tr>
    <tr>
      <td><b>TS-005</b></td>
      <td>Persistencia local de sesion y usuarios demo con localStorage</td>
      <td>Como desarrollador frontend, quiero guardar la sesion y las relaciones demo en localStorage para mantener la experiencia del usuario durante la navegacion y recarga de pagina.</td>
      <td><b>Sesion persistente.</b><br>Given el usuario inicia sesion correctamente<br>When recarga la pagina<br>Then el sistema mantiene los datos de sesion disponibles<br><br><b>Clientes asignados persistentes.</b><br>Given un veterinario agrega o elimina un cliente demo<br>When se actualiza la relacion<br>Then el sistema guarda el cambio en localStorage</td>
      <td>EP-001, EP-006</td>
    </tr>
    <tr>
      <td><b>TS-006</b></td>
      <td>Internacionalizacion con vue-i18n</td>
      <td>Como desarrollador frontend, quiero configurar vue-i18n para mostrar textos de la aplicacion en espanol e ingles.</td>
      <td><b>Cambio de idioma.</b><br>Given el usuario selecciona un idioma disponible<br>When se actualiza la configuracion de i18n<br>Then los textos de la interfaz se muestran en el idioma seleccionado<br><br><b>Textos reutilizables.</b><br>Given una vista necesita mostrar etiquetas o titulos<br>When usa la funcion t<br>Then obtiene el texto desde los archivos de traduccion</td>
      <td>EP-001, EP-010</td>
    </tr>
    <tr>
      <td><b>TS-007</b></td>
      <td>Integracion de graficos estadisticos con Chart.js y PrimeVue Chart</td>
      <td>Como desarrollador frontend, quiero integrar graficos estadisticos para mostrar analiticas visuales de estado del hato, registros sanitarios y atenciones por hato.</td>
      <td><b>Grafico renderizado.</b><br>Given existen datos visibles para el usuario<br>When ingresa al apartado de analiticas<br>Then el sistema renderiza graficos usando los datos calculados del frontend<br><br><b>Datos filtrados por rol.</b><br>Given el usuario tiene rol de ganadero o veterinario<br>When visualiza analiticas<br>Then los graficos usan solo la informacion permitida para su rol</td>
      <td>EP-009</td>
    </tr>
    <tr>
      <td><b>TS-008</b></td>
      <td>Construccion de componentes responsive y layout por rol</td>
      <td>Como desarrollador frontend, quiero construir un layout responsive con menu lateral y opciones segun rol para mejorar la navegacion en distintas pantallas.</td>
      <td><b>Menu segun rol.</b><br>Given el usuario inicia sesion como ganadero o veterinario<br>When se muestra el layout principal<br>Then el menu lateral muestra solo las opciones correspondientes a su rol<br><br><b>Adaptacion visual.</b><br>Given el usuario usa una pantalla pequena<br>When navega por la aplicacion<br>Then el layout y los componentes se adaptan para mantener legibilidad y uso correcto</td>
      <td>EP-010</td>
    </tr>
  </tbody>
</table>
