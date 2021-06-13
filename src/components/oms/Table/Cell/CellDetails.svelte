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
</script>

<td class="has-text-centered" on:click>
  {#if row.ideventtype == 100 || row.ideventtype == 101}
    <CellIdEventType_100_101 {value} />
  {:else if row.ideventtype == 102 || row.ideventtype == 103}
    <CellIdEventType_102_103 {value} />
  {:else if row.ideventtype == 104 || row.ideventtype == 105}
    <CellIdEventType_104_105 {value} />
  {:else if row.ideventtype == 106 || row.ideventtype == 107}
    <CellIdEventType_106_107 {value} />
  {:else if row.ideventtype == 108 || row.ideventtype == 109}
    <CellIdEventType_108_109 {value} />
  {:else if row.ideventtype == 110 || row.ideventtype == 111}
    <CellIdEventType_110_111 {value} />
  {:else if row.ideventtype == 112 || row.ideventtype == 113}
    <CellIdEventType_112_113 {value} />
  {:else if row.ideventtype == 114 || row.ideventtype == 115}
    <CellIdEventType_114_115 {value} />
  {:else if row.ideventtype == 116 || row.ideventtype == 117}
    <CellIdEventType_116_117 {value} />
  {:else if row.ideventtype == 124 || row.ideventtype == 125}
    <CellIdEventType_124_125 {value} />
  {:else if row.ideventtype == 126 || row.ideventtype == 127}
    <CellIdEventType_126_127 {value} />
  {:else if row.ideventtype == 128 || row.ideventtype == 129}
    <CellIdEventType_128_129 {value} />
  {:else if row.ideventtype == 130 || row.ideventtype == 131}
    <CellIdEventType_130_131 {value} />
  {:else if row.ideventtype == 132 || row.ideventtype == 133}
    <CellIdEventType_132_133 {value} />
    {:else if row.ideventtype == 134 || row.ideventtype == 135}
    <CellIdEventType_134_135 {value} />    
  {:else if row.ideventtype == 296 || row.ideventtype == 297}
    <CellIdEventType_296_297 {value} />
  {:else if row.ideventtype == 298 || row.ideventtype == 299}
    <CellIdEventType_298_299 {value} />
  {:else if row.ideventtype == 300 || row.ideventtype == 301}
    <CellIdEventType_300_301 {value} />
  {:else if row.ideventtype == 302 || row.ideventtype == 303}
    <CellIdEventType_302_303 {value} />
  {:else if row.ideventtype == 313 || row.ideventtype == 314}
    <CellIdEventType_313_314 {value} />
  {:else}
    {JSON.stringify(value)}
  {/if}
</td>

<style>
</style>
