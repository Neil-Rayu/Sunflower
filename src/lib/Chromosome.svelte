<script>
  //
  export let length;
  export let placeHolder; 
</script>

<div class="chrom-holder">
  {#each Array(length) as _, i}
     <div class="base" id="base-{i}">{placeHolder.charAt(i)}</div>
  {/each}
</div>

<style>
  .chrom-holder{
    display: flex;
    flex-direction: row;
  }
  .base{
    width: 30px;
    height: 30px;
    border: 1px solid black;
    margin-bottom: 5px;
  }
</style>