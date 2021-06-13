<script>
  import { onMount } from "svelte";
  import Tabla from "../../edwinspire/Table/Table.svelte";

  let ColumnsEndPoints = {
    idtask: { hidden: true },
    ts: { hidden: true },
    rowkey: { hidden: true },
    task_start: { label: "Inicio", type: "Date" },
    task_end: { label: "Fin", type: "Date" },
    last_run: { label: "Última", type: "Date" },
    next_run: { label: "Próxima", type: "Date" },
    once_run: { label: "Correr", type: "Date" },
  };

  function HandleSelectEditMethod(event) {
    console.log(event);
  }

  onMount(async () => {});
</script>

<Tabla
  url="/pgapi/scheduled_tasks/scheduled_tasks"
  columns={ColumnsEndPoints}
  on:editrow={HandleSelectEditMethod}
>
  <span slot="title">
    <b>Tareas Programadas</b>
  </span>
</Tabla>
