<script>
  import CellIdEventType_100_101 from "./CellIdEventType_100_101.svelte";
  import CellIdEventType_102_103 from "./CellIdEventType_102_103.svelte";
  import CellIdEventType_104_105 from "./CellIdEventType_104_105.svelte";
  import CellIdEventType_106_107 from "./CellIdEventType_106_107.svelte";
  import CellIdEventType_108_109 from "./CellIdEventType_108_109.svelte";
  import CellIdEventType_110_111 from "./CellIdEventType_110_111.svelte";
  import CellIdEventType_112_113 from "./CellIdEventType_112_113.svelte";
  import CellIdEventType_114_115 from "./CellIdEventType_114_115.svelte";
  import CellIdEventType_116_117 from "./CellIdEventType_116_117.svelte";
  import CellIdEventType_124_125 from "./CellIdEventType_124_125.svelte";
  import CellIdEventType_126_127 from "./CellIdEventType_126_127.svelte";
  import CellIdEventType_128_129 from "./CellIdEventType_128_129.svelte";
  import CellIdEventType_130_131 from "./CellIdEventType_130_131.svelte";
  import CellIdEventType_132_133 from "./CellIdEventType_132_133.svelte";
  import CellIdEventType_134_135 from "./CellIdEventType_134_135.svelte";
  import CellIdEventType_296_297 from "./CellIdEventType_296_297.svelte";
  import CellIdEventType_298_299 from "./CellIdEventType_298_299.svelte";
  import CellIdEventType_300_301 from "./CellIdEventType_300_301.svelte";
  import CellIdEventType_302_303 from "./CellIdEventType_302_303.svelte";
  import CellIdEventType_313_314 from "./CellIdEventType_313_314.svelte";

  export let value;
  export let row = {};

  const ListCellType = {
    OCSC100: CellIdEventType_100_101,
    "02": CellIdEventType_102_103,
    "03": CellIdEventType_104_105,
    "04": CellIdEventType_106_107,
    "05": CellIdEventType_108_109,
    "06": CellIdEventType_110_111,
    "07": CellIdEventType_112_113,
    "08": CellIdEventType_114_115,
    "09": CellIdEventType_116_117,
    "10": CellIdEventType_124_125,
    "11": CellIdEventType_126_127,
    "12": CellIdEventType_128_129,
    "13": CellIdEventType_130_131,
    "14": CellIdEventType_132_133,
    "15": CellIdEventType_134_135,
    "16": CellIdEventType_296_297,
    "17": CellIdEventType_298_299,
    "18": CellIdEventType_300_301,
    "19": CellIdEventType_302_303,
    "20": CellIdEventType_313_314,
  };

</script>

<td class="has-text-centered" on:click>
  {#if ListCellType[row.code]}
    <svelte:component this={ListCellType[row.code]} />
  {:else if ListCellType[row.code.substring(1)]}
    <svelte:component this={ListCellType[row.code.substring(1)]} />
  {:else}
    {JSON.stringify(value)}
  {/if}
</td>
