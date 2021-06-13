<script>
  import { onMount } from "svelte";
  //import { CurrentSession } from "@edwinspire/svelt-session/Store";
  import Tabla from "../edwinspire/Table/Table.svelte";
  let NavOnLine = false;
  let MenuOpen = false;

  /*
  idevent, dateevent, idaccount, account_name, 
  label,  priority, ideventtype, iduser, idcontact, 
  details, idsource, idstatustype, identification, 
  account, iddivision
  */

  let ColumnsEndPoints = {
    dateevent: { label: "Fecha", type: "DateColor01" },
    account_name: { label: "Cliente" },
    label: { label: "Evento" },
    priority: { label: "-", type: "Priority" },
    details: { label: "Datos" , type: "EventDetails"},
    idevent: {hidden: true},
    idaccount: {hidden: true},
    ideventtype: {hidden: true},
    iduser: {hidden: true},
    idcontact: {hidden: true},
    idsource: {hidden: true},
    idstatustype: {hidden: true},
    identification: {hidden: true},
    account: {hidden: true},
    iddivision: {hidden: true},
    icon: {hidden: true}
  };

  onMount(async () => {});
</script>

<Tabla url="/pgapi/v2/events" columns={ColumnsEndPoints}>
  <span slot="title">
    <b>Ultimos Eventos</b>
  </span>
</Tabla>
