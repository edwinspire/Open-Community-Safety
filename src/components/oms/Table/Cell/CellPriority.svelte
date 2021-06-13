<script>
  export let value;
  export let icon;
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

  console.log(icon);

</script>

<td class=" has-text-centered" on:click>
  <div class="icon-text">
    <span
      class="icon {CLASS_PRIORITY[value.toString()].has_text ||
        'has-text-grey-dark'}"
    >
      <i
        class={icon ||
          CLASS_PRIORITY[value.toString()].icon ||
          "fas fa-bell fa-lg"}
      />
    </span>
  </div>
</td>
