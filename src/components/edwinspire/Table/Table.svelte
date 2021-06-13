<script>
  const crypto = require("crypto");
  import XLSX from "xlsx";
  import { createEventDispatcher } from "svelte";
  import { onDestroy, onMount } from "svelte";
  import TableCell from "./TableCell";
  import { GetData } from "./GetData";
  import { ArrayChunk } from "@edwinspire/utils/ArrayChunk";
  //-      -//
  const dispatch = createEventDispatcher();
  let DataTable = [];
  let SelectedRows = [];
  export let RawDataTable = [];
  let text_search;
  let loading = false;
  let showEdit = false;
  let showSelection = false;
  let ColumnSort;
  let ShowDialogColumn = false;

  //-- Pagination --//
  let PageSelected = 1;
  let RowsPerPage = 20;
  let totalFilteredRows = 0;
  let TotalPages = 0;
  let paginatedData = [];

  let SelectAll = false;
  export let columns = {};
  export let url = "";
  export let params = {};
  let orderASC = true;
  let internal_columns = {};

  $: SelectedRows, OnSelection();

  function OnSelection() {
    dispatch("selectrows", { rows: GetSelectedRows()});
  }

  onMount(() => {
    GetDataTable();
  });

  function SetColumns() {
    if (RawDataTable && RawDataTable.length > 0) {
      let MaxSizeLabel = 15;
      internal_columns = {};
      Object.keys(RawDataTable[0]).forEach((item) => {
        if (item === "internal_hash_row") {
          internal_columns[item] = {
            label: item.substring(0, MaxSizeLabel),
            hidden: true,
          };
        } else if (columns[item]) {
          internal_columns[item] = columns[item];
          if (!internal_columns[item].label) {
            internal_columns[item].label = item.substring(0, MaxSizeLabel);
          }
        } else {
          // Tambien limita la longitud del nombre de la columna a 10 caracteres
          internal_columns[item] = {
            label: item.substring(0, MaxSizeLabel),
            hidden: false,
          };
        }
      });
    }
    //console.log(internal_columns);
  }

  function RowIsSelected(internal_hash_row) {
    let isSelected = SelectedRows.includes(internal_hash_row);
    return isSelected;
  }

  export function GetSelectedRows() {
    return RawDataTable.filter((row) => {
      return SelectedRows.includes(row.internal_hash_row);
    });
  }

  function ExportTable() {
    try {
      // Filter only selection
      let filteredData = GetSelectedRows();

      let FormatedData = filteredData.map((row) => {
        let r = { ...row };
        // Convert to string objects
        Object.keys(row).forEach((key) => {
          if (columns[key] && columns[key].type == "Date") {
            r[key] = new Date(row[key]).toString();
          } else if (row[key] !== null && typeof row[key] === "object") {
            r[key] = JSON.stringify(row[key], null, 4);
          }
        });
        delete r.internal_hash_row;
        return r;
      });

      if (FormatedData && FormatedData.length > 0) {
        /* Create a worksheet */
        var ws = XLSX.utils.json_to_sheet(FormatedData);
        /* Create a new empty workbook, then add the worksheet */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Report");
        XLSX.writeFile(wb, "Table_" + Date.now() + ".xlsx");
      }
    } catch (error) {
      console.error(error);
    }
  }

  let auto_refresh = setInterval(() => {
    GetDataTable();
  }, 15 * 1000);

  onDestroy(() => {
    console.log("Mata refresh");
    clearInterval(auto_refresh);
  });

  function SortColumn(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  function HClickCell(cell, row) {
    dispatch("clickrow", { field: cell, data: row });
  }

  function HClickEditRow(e) {
    dispatch("editrow", { data: e });
  }
  function HClickNew(e) {
    dispatch("newrow", e);
  }
  function HClickHeader(e) {
    ColumnSort = e.target.dataset.column;
    orderASC = !orderASC;
    FilterData();
  }

  function handleClickSearch() {
    if (text_search && text_search.length > 0) {
      FilterData();
    } else {
      GetDataTable();
    }
  }

  GetDataTable();

  function handleChangeSelectAll(e) {
    SelectAll = e.target.checked;

    if (SelectAll) {
      SelectedRows = [];

      paginatedData.forEach((pag) => {
        SelectedRows = SelectedRows.concat(
          pag.map((item) => {
            return item.internal_hash_row;
          })
        );
      });
    } else {
      SelectedRows = [];
    }
    //console.log(SelectedRows);
    FilterData();
  }

  function handleExportSelection(e) {
    ExportTable();
  }

  function FilterData() {
    //console.log("Filtrar", text_search);
    let TempData;
    if (text_search && text_search.length > 0) {
      TempData = RawDataTable.filter((d) => {
        let s = Object.values(d).filter((item) => {
          if (item) {
            return item
              .toString()
              .toUpperCase()
              .includes(text_search.toUpperCase());
          } else {
            return item;
          }
        });
        if (s.length > 0) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      TempData = RawDataTable;
    }
    totalFilteredRows = TempData.length;
    Pagination(TempData);
  }

  function Pagination(rows) {
    if (ColumnSort) {
      if (orderASC) {
        rows = rows.sort(SortColumn(ColumnSort));
      } else {
        rows = rows.sort(SortColumn(ColumnSort, "desc"));
      }
    }

    paginatedData = ArrayChunk(rows, RowsPerPage);
    TotalPages = paginatedData.length;
    if (PageSelected > TotalPages) {
      PageSelected = 1;
    }
    SelectPage();
  }

  function SelectPage() {
    DataTable = paginatedData[PageSelected - 1];
  }

  function HandleOnClickEdit() {
    console.log(showEdit);
    showEdit = !showEdit;
    return false;
  }

  function HandleOnClickSelection() {
    console.log(showSelection);
    showSelection = !showSelection;
    return false;
  }

  function HandleOnRowSelected(event) {
    let internal_hash_row = event.target.dataset.internal_hash_row;
    if (event.target.checked) {
      SelectedRows.push(internal_hash_row);
    } else {
      SelectedRows = SelectedRows.filter((value) => {
        return value !== internal_hash_row;
      });
    }
    OnSelection();
  }

  async function GetDataTable() {
    if (loading) {
      console.log("Hay una petición en curso");
    } else {
      if (url && url.length > 0) {
        try {
          loading = true;
          RawDataTable = await GetData(url, params);
          let Listinternal_hash_row = {}; // Esta variable se usa unicamente para verificar que no se generen llaves duplicadas
          RawDataTable = RawDataTable.map((row) => {
            let c = crypto
              .createHash("md5")
              .update(JSON.stringify(row))
              .digest("base64");

            if (Listinternal_hash_row[c]) {
              console.error("Hay un registro duplicado en la tabla", row);
              c =
                c +
                "-" +
                new Date().getTime() +
                "-" +
                Math.floor(Math.random() * 10000);
              Listinternal_hash_row[c] = true;
            } else {
              Listinternal_hash_row[c] = true;
            }
            return { ...row, internal_hash_row: c };
          });

          //console.log(RawDataTable);

          SetColumns();
          FilterData();
          loading = false;
        } catch (error) {
          console.error(error);
          loading = false;
        }
      } else {
        console.warn("Not url asigned");
      }
    }
  }
</script>

<!-- Main container -->
<nav class="level">
  <!-- Left side -->
  <div class="level-left">
    <div class="level-item">
      <span class="margin_title"><slot name="title">.</slot></span>
    </div>
  </div>

  <!-- Right side -->
  <div class="level-right">
    {#if loading}
      <div class="level-item">
        <span class="icon has-text-info">
          <i class="fas fa-spinner fa-pulse" />
        </span>
      </div>
    {/if}

    <slot name="item-1" class="level-item" />
    <slot name="item-2" class="level-item" />
    <slot name="item-3" class="level-item" />
    <slot name="item-4" class="level-item" />
    <slot name="item-5" class="level-item" />

    <div class="level-item">
      <div class="dropdown is-hoverable is-right">
        <div class="dropdown-trigger">
          <button
            class="button is-small"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span class="icon">
              <i class="fa fa-list" aria-hidden="true" />
            </span>
            <span>Opciones</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        <div class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="dropdown-item is-size-7" on:click={HClickNew}>
              <span class="icon">
                <i class="fas fa-file" />
              </span>
              <span>Agregar</span>
            </a>
            <hr class="dropdown-divider" />

            <!-- svelte-ignore a11y-missing-attribute -->
            <a
              class="dropdown-item is-size-7"
              class:is-active={showSelection}
              on:click={HandleOnClickSelection}
            >
              <span class="icon">
                <i class="fas fa-tasks" />
              </span>
              <span>Selección</span>
            </a>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
              class="dropdown-item is-size-7"
              class:is-active={showEdit}
              on:click={HandleOnClickEdit}
            >
              <span class="icon">
                <i class="fas fa-pen" />
              </span>
              <span>Editar</span>
            </a>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="dropdown-item is-size-7" on:click={handleExportSelection}>
              <span class="icon">
                <i class="far fa-file-excel" />
              </span>
              <span>Exportar</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="level-item">
      <div class="field has-addons">
        <p class="control">
          <input
            class="input size_search is-small"
            type="text"
            placeholder="Buscar"
            bind:value={text_search}
          />
        </p>
        <p class="control">
          <button class="button is-small" on:click={handleClickSearch}>
            <i class="fas fa-search" />
          </button>
        </p>
      </div>
    </div>
  </div>
</nav>

{#if DataTable && DataTable.length > 0}
  <div class="table-container is-size-7">
    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
      <!-- Aqui escribe el encabezado de la tabla -->
      <thead>
        <tr>
          <th class="has-text-centered">#</th>

          {#if showSelection}
            <th class="has-text-centered">
              <input type="checkbox" on:click={handleChangeSelectAll} />
            </th>
          {/if}

          {#if showEdit}
            <th class="has-text-centered">
              <i class="fas fa-pen" />
            </th>
          {/if}

          {#each Object.keys(DataTable[0]) as item, ith}
            <!-- Muestra las columnas que no se hayan especificado como ocultas -->
            {#if internal_columns[item]}
              {#if !internal_columns[item].hidden || !internal_columns[item].hidden == null}
                <!-- Mostramos label si esque existe -->
                <th
                  class="has-text-centered show_cursor_mouse"
                  data-column={item}
                  on:click={HClickHeader}
                >
                  {internal_columns[item].label}
                </th>
              {/if}
            {/if}
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each DataTable as dataRow, i (dataRow.internal_hash_row)}
          <tr>
            <td>{i + 1 + RowsPerPage * (PageSelected - 1)}</td>
            {#if showSelection}
              <td class="has-text-centered">
                <input
                  class="show_cursor_mouse"
                  type="checkbox"
                  checked={RowIsSelected(dataRow.internal_hash_row)}
                  data-internal_hash_row={dataRow.internal_hash_row}
                  on:click={HandleOnRowSelected}
                />
              </td>
            {/if}

            {#if showEdit}
              <td
                class="has-text-centered show_cursor_mouse"
                on:click={HClickEditRow(dataRow)}
              >
                <span class="icon is-small">
                  <i class="fas fa-pen" />
                </span>
              </td>
            {/if}
            {#each Object.keys(dataRow) as item, itd}
              <!-- Muestra las columnas que no se hayan especificado como ocultas -->
              {#if internal_columns[item]}
                {#if !internal_columns[item].hidden || internal_columns[item].hidden == null}
                  <TableCell
                    on:click={HClickCell(item, dataRow)}
                    row={dataRow}
                    value={dataRow[item]}
                    type={internal_columns[item].type}
                  />
                {/if}
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="table_pagination">
    <!-- Main container -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        {#if paginatedData && paginatedData.length > 1}
          <div class="level-item">
            <span class="">
              Página {PageSelected} de {TotalPages} (Total {totalFilteredRows}
              filas)
            </span>
          </div>
          <div class="level-item">
            <div class="buttons has-addons">
              <button
                class="button is-small"
                on:click={() => {
                  PageSelected = 1;
                  SelectPage();
                }}
              >
                <span class="icon ">
                  <i class="fas fa-angle-double-left" />
                </span>
              </button>
              <button
                class="button is-small"
                on:click={() => {
                  if (PageSelected > 1) {
                    PageSelected = PageSelected - 1;
                  }
                  SelectPage();
                }}
              >
                <span class="icon ">
                  <i class="fas fa-angle-left" />
                </span>
              </button>
              <button
                class="button is-small is-info"
                on:click={() => {
                  //PageSelected = 1;
                  SelectPage();
                }}>{PageSelected}</button
              >
              {#if PageSelected + 1 <= TotalPages}
                <button
                  class="button is-small"
                  on:click={() => {
                    PageSelected = PageSelected + 1;
                    SelectPage();
                  }}>{PageSelected + 1}</button
                >
              {/if}
              {#if PageSelected + 2 <= TotalPages}
                <button
                  class="button is-small"
                  on:click={() => {
                    PageSelected = PageSelected + 2;
                    SelectPage();
                  }}>{PageSelected + 2}</button
                >
              {/if}

              {#if PageSelected + 3 <= TotalPages}
                <button
                  class="button is-small"
                  on:click={() => {
                    PageSelected = PageSelected + 3;
                    SelectPage();
                  }}>{PageSelected + 3}</button
                >
              {/if}

              {#if PageSelected + 4 <= TotalPages}
                <button
                  class="button is-small"
                  on:click={() => {
                    PageSelected = PageSelected + 4;
                    SelectPage();
                  }}>{PageSelected + 4}</button
                >
              {/if}

              <button
                class="button is-small"
                on:click={() => {
                  if (PageSelected < TotalPages) {
                    PageSelected = PageSelected + 1;
                    SelectPage();
                  }
                }}
              >
                <span class="icon">
                  <i class="fas fa-angle-right" />
                </span>
              </button>

              <button
                class="button is-small"
                on:click={() => {
                  PageSelected = TotalPages;
                  SelectPage();
                }}
              >
                <span class="icon">
                  <i class="fas fa-angle-double-right" />
                </span>
              </button>
            </div>
          </div>
        {/if}
      </div>

      <!-- Right side -->
      <div class="level-right">
        <span class="level-item">
          <span class="label_rows_per_page">Filas por página</span>
          <div class="select is-small">
            <!-- svelte-ignore a11y-no-onchange -->
            <select
              name="rows_per_page"
              bind:value={RowsPerPage}
              on:change={() => {
                FilterData();
              }}
            >
              <option value="20" selected>20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
            </select>
          </div>
        </span>
      </div>
    </nav>
  </div>
{:else}
  <div class="has-text-centered has-text-link-dark">
    <i class="fa fa-table" aria-hidden="true" />
    No hay datos que mostrar
  </div>
{/if}

<div class="modal" class:is-active={ShowDialogColumn}>
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head has-background-dark">
      <p class="modal-card-title has-text-white">
        <b>
          <span>Columnas</span>
        </b>
      </p>
      <button
        class="delete"
        aria-label="close"
        on:click={(e) => {
          ShowDialogColumn = false;
        }}
      />
    </header>
    <section class="modal-card-body">
      <div class="columns">
        {#each Object.keys(columns) as col}
          <div class="column">
            <label class="checkbox">
              <input type="checkbox" />
              {col}
            </label>
          </div>
        {/each}
      </div>
    </section>
    <footer class="modal-card-foot has-background-dark">
      <button class="button is-success is-small">
        <span>Aceptar</span>
      </button>
      <button
        class="button is-small"
        on:click={(e) => {
          ShowDialogColumn = false;
        }}
      >
        <span>Cancelar</span>
      </button>
    </footer>
  </div>
</div>

<style>
  .size_search {
    width: 7em;
  }
  .show_cursor_mouse {
    cursor: pointer;
  }

  .table_pagination {
    width: 98%;
    margin: auto;
  }
  .label_rows_per_page {
    margin-right: 1em;
  }
  .margin_title {
    margin-left: 0.5em;
  }
</style>
