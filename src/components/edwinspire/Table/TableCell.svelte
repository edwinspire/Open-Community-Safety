<script>
  import moment from "moment";
  import TableCellBoolean01 from "./Cell/TableCellBoolean01.svelte";

  import TableCellDetails from "../../oms/Table/Cell/CellDetails.svelte";
  import TableCellPriority from "../../oms/Table/Cell/CellPriority.svelte";

  export let type;
  export let value;
  export let row;
  let DC001 = false;

  function fn_DC01() {
    if (type === "DateColor01") {
      DC001 = !(
        new Date(value).getFullYear() === new Date().getFullYear() &&
        new Date(value).getDate() === new Date().getDate()
      );
    }
  }

  $: value, fn_DC01();
</script>

{#if type}
  {#if type === "Date"}
    <td on:click>
      {moment(Date.parse(value)).format("YYYY-MM-DD HH:mm:ss")}
    </td>
  {:else if type === "DateColor01"}
    <td on:click class:has-text-danger={DC001}>
      {moment(Date.parse(value)).format("YYYY-MM-DD HH:mm:ss")}
    </td>
  {:else if type === "Priority"}
    <TableCellPriority on:click {value} icon={row.icon} />
  {:else if type === "EventDetails"}
    <TableCellDetails on:click {value} {row} />
  {:else if type === "Boolean01"}
    <TableCellBoolean01 on:click {value} {row} />
  {:else if type === "Boolean-Color"}
    {#if !value}
      <td
        on:click
        class="has-background-danger has-text-white has-text-centered"
      >
        <i class="fa fa-times" aria-hidden="true" />
      </td>
    {:else}
      <td
        on:click
        class="has-background-success has-text-white has-text-centered"
      >
        <i class="fa fa-check" aria-hidden="true" />
      </td>
    {/if}
  {:else}
    <td on:click>con tipo desconocido {value}</td>
  {/if}
{:else if typeof value === "object" && value !== null}
  <td on:click>{@html JSON.stringify(value, null, "</br>")}</td>
{:else}
  <td on:click>{value}</td>
{/if}
