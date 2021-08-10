<script>
  export let value;
  export let icon = "";
  let ClassHasText = "has-text-grey-dark";
  const CLASS_PRIORITY = {
    "1": { has_text: "has-text-danger", icon: "fas fa-angry fa-lg" },
    "2": {
      has_text: "has-text-warning",
      icon: "fas fa-exclamation-triangle fa-lg",
    },
    "3": { has_text: "has-text-success", icon: "fas fa-check fa-lg" },
    "4": { has_text: "has-text-primary", icon: "fas fa-thumbs-up fa-lg" },
    "5": { has_text: "has-text-info", icon: "fas fa-bell fa-lg" },
    "6": { has_text: "has-text-link", icon: "far fa-bell fa-lg" },
  };

  //console.log(icon, value.toString());
  $: value, SetHastext();

  function SetHastext() {
    if (
      CLASS_PRIORITY[value.toString()] &&
      CLASS_PRIORITY[value.toString()].has_text
    ) {
      ClassHasText = CLASS_PRIORITY[value.toString()].has_text;
    } else {
      ClassHasText = "has-text-grey-dark";
    }
  }
</script>

<td class=" has-text-centered" on:click>
  <div class="icon-text">
    <span class="icon {ClassHasText}">
      {#if icon}
        <i class={icon} />
      {:else if CLASS_PRIORITY[value.toString()] && CLASS_PRIORITY[value.toString()].icon}
        <i class={CLASS_PRIORITY[value.toString()].icon} />
      {:else}
        <i class="fas fa-bell fa-lg" />
      {/if}
    </span>
  </div>
</td>
