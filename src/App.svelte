<script>
  import Chromosome from './lib/Chromosome.svelte';
  let length = 10;

  var GeneticAlgorithm = function () {};

  GeneticAlgorithm.prototype.generate = function (length) {
    let chromosome = '';
    for (let i = 0; i < length; i++) {
      if (Math.floor(Math.random() * 10) % 2 == 0) {
        chromosome += '1';
      } else {
        chromosome += '0';
      }
    }
    return chromosome;
  };
  let g = new GeneticAlgorithm();
  let x = g.generate(10);
  let y = g.generate(10);
  //console.log(x, y);

  function fitness(chromosome, solution) {
    let score = 0;
    for (let i = 0; i < chromosome.length; i++) {
      if (chromosome.charAt(i) != solution.charAt(i)) {
        score++;
      }
    }
    return 1 / (1 + score);
  }

  // console.log(fitness(x, '1111111111'));
  // console.log(fitness(y, '1111111111'));

  GeneticAlgorithm.prototype.select = function (population, fitnesses) {
    // let tempPop = population;
    // let sum = 0;
    // let random =
    //   Math.random() * fitnesses.reduce((partialSum, a) => partialSum + a, 0);
    // let n = 0;
    // while (sum <= random) {
    //   sum += fitnesses[n];
    //   n++;
    // }
    // p1 = tempPop.splice(n--, 1);
    // sum = 0;
    // random =
    //   Math.random() * fitnesses.reduce((partialSum, a) => partialSum + a, 0);

    // let x = 0;
    // while (sum <= random) {
    //   sum += fitnesses[n];
    //   x++;
    // }

    let max = fitnesses[0];
    let index1 = 0;
    for (let i = 0; i < fitnesses.length; i++) {
      if (fitnesses[i] > max) {
        max = fitnesses[i];
        index1 = i;
      }
    }
    fitnesses.splice(index1, 1);
    let max2 = fitnesses[0];
    let index2 = 0;
    for (let i = 0; i < fitnesses.length; i++) {
      if (fitnesses[i] > max2) {
        max2 = fitnesses[i];
        index2 = i;
      }
    }
    return [population[index1], population[index2]];
  };

  GeneticAlgorithm.prototype.mutate = function (chromosome, p) {
    for (let i = 0; i < chromosome.length; i++) {
      if (Math.random() <= p) {
        if (chromosome.charAt(i) == '1') {
          chromosome =
            chromosome.substring(0, i) + '0' + chromosome.substring(i + 1);
        } else {
          chromosome =
            chromosome.substring(0, i) + '1' + chromosome.substring(i + 1);
        }
      }
    }
    return chromosome;
  };
  //console.log(g.mutate(x, 0.02));

  GeneticAlgorithm.prototype.crossover = function (chromosome1, chromosome2) {
    let n = Math.floor(Math.random() * chromosome1.length);
    //console.log(n);
    let x = chromosome1;
    chromosome1 = chromosome1.substring(0, n) + chromosome2.substring(n);
    chromosome2 = chromosome2.substring(0, n) + x.substring(n);
    return [chromosome1, chromosome2];
  };
  //console.log(g.crossover(x, y));

  GeneticAlgorithm.prototype.run = function (fitness, length, iterations) {
    // GENERATE INITIAL CHROMOSOMES
    let genePoolChromosomes = [];
    let genePoolFitness = [];
    for (let i = 0; i < 10; i++) {
      genePoolChromosomes.push(this.generate(length));
    }
    for (let j = 0; j < 10; j++) {
      genePoolFitness.push(fitness(genePoolChromosomes[j], '1111111111'));
    }

    console.log(genePoolChromosomes, genePoolFitness); //CONSOLE LOG!!
    for (let gen = 0; gen < iterations; gen++) {
      let tempC = [];
      for (let i = 0; i < 10; i++) {
        let cross = this.select(genePoolChromosomes, genePoolFitness);

        //console.log(cross); //CONSOLE LOG!!

        tempC = tempC.concat(
          this.crossover(
            this.mutate(cross[0], 0.06),
            this.mutate(cross[1], 0.06)
          )
        );
      }
      //console.log(tempC);
      genePoolChromosomes = tempC;
      for (let x = 0; x < 20; x++) {
        genePoolFitness[x] = fitness(genePoolChromosomes[x], '1111111111');
      }

      console.log(genePoolChromosomes, genePoolFitness); //CONSOLE LOG!!
      if (genePoolFitness.includes(1)) {
        console.log('HELL YEAHHHS');
        break;
      }
    }
    return [genePoolChromosomes, genePoolFitness];
  };

  let chromosomes = g.run(fitness, 10, 30);
  $: loop = false;
  function onClick() {
    loop = true;
  }
  let test = '0101010101';

  const shade = Math.random() * 2 - 1;
  const soilHealth = Math.random() * 2 - 1;
  const birdCnt = Math.random() * 2 - 1;
  const waterFall = Math.random() * 2 - 1;
  console.log(shade, soilHealth, birdCnt, waterFall);

  /**
   * @param {string[]} chromosomes
   */
  function naturalFitness(chromosomes) {
    let heightCnt = 0;
    let seedCnt = 0;
    let curveCnt = 0;
    let rootCnt = 0;
    chromosomes[0].split('').forEach((base) => {
      if (Number(base) == 1) {
        heightCnt++;
      }
    });
    // chromosomes[1].forEach(base => {
    //       if(base == 1){
    //         seedCnt++;
    //       }
    // });
    chromosomes[1].split('').forEach((base) => {
      if (Number(base) == 1) {
        curveCnt++;
      }
    });
    chromosomes[2].split('').forEach((base) => {
      if (Number(base) == 1) {
        rootCnt++;
      }
    });
    let fitness =
      heightCnt * shade +
      heightCnt * soilHealth +
      rootCnt * soilHealth +
      heightCnt * (-1 * birdCnt) +
      heightCnt * ((-1 * birdCnt) / 2) +
      (curveCnt * birdCnt) / 2 +
      waterFall * curveCnt;
    return fitness;
  }
  console.log(naturalFitness(['0000010000', '0000100000', '0000001000']));

  var NaturalGeneticAlgorithm = function () {};

  NaturalGeneticAlgorithm.prototype.generate = function (length) {
    let chromosome = '';
    for (let i = 0; i < length; i++) {
      if (Math.floor(Math.random() * 10) % 2 == 0) {
        chromosome += '1';
      } else {
        chromosome += '0';
      }
    }
    return chromosome;
  };

  // console.log(fitness(x, '1111111111'));
  // console.log(fitness(y, '1111111111'));

  NaturalGeneticAlgorithm.prototype.select = function (population, fitnesses) {
    let max = fitnesses[0];
    let index1 = 0;
    for (let i = 0; i < fitnesses.length; i++) {
      if (fitnesses[i] > max) {
        max = fitnesses[i];
        index1 = i;
      }
    }
    fitnesses.splice(index1, 1);
    let max2 = fitnesses[0];
    let index2 = 0;
    for (let i = 0; i < fitnesses.length; i++) {
      if (fitnesses[i] > max2) {
        max2 = fitnesses[i];
        index2 = i;
      }
    }
    return [population[index1], population[index2]];
  };

  NaturalGeneticAlgorithm.prototype.mutate = function (chromosome, p) {
    for (let i = 0; i < chromosome.length; i++) {
      if (Math.random() <= p) {
        if (chromosome.charAt(i) == '1') {
          chromosome =
            chromosome.substring(0, i) + '0' + chromosome.substring(i + 1);
        } else {
          chromosome =
            chromosome.substring(0, i) + '1' + chromosome.substring(i + 1);
        }
      }
    }
    return chromosome;
  };
  //console.log(g.mutate(x, 0.02));

  NaturalGeneticAlgorithm.prototype.crossover = function (
    chromosome1,
    chromosome2
  ) {
    let n = Math.floor(Math.random() * chromosome1.length);
    //console.log(n);
    let x = chromosome1;
    chromosome1 = chromosome1.substring(0, n) + chromosome2.substring(n);
    chromosome2 = chromosome2.substring(0, n) + x.substring(n);
    return [chromosome1, chromosome2];
  };
  //console.log(g.crossover(x, y));
  NaturalGeneticAlgorithm.prototype.naturalRun = function (
    fitness,
    length,
    iterations
  ) {
    // GENERATE INITIAL CHROMOSOMES
    let genePoolChromosomes = [[], [], [], [], [], [], [], [], [], []];
    let genePoolFitness = [];
    //Fill starting sunflower chromosomes
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 3; j++) {
        genePoolChromosomes[i].push(this.generate(length));
      }
    }
    //Get fitness for starting pool
    for (let i = 0; i < 10; i++) {
      genePoolFitness[i] = fitness(genePoolChromosomes[i]);
    }

    console.log(genePoolChromosomes, genePoolFitness); //CONSOLE LOG!!

    for (let gen = 0; gen < iterations; gen++) {
      let tempC = [[], [], [], [], [], [], [], [], [], []]; //new temp chromosome list
      for (let i = 0; i < 10; i += 2) {
        let cross = this.select(genePoolChromosomes, genePoolFitness); //Select Three
        //console.log(cross); //CONSOLE LOG!!
        for (let index = 0; index < 3; index++) {
          let dub = this.crossover(
            this.mutate(cross[0][index], 0.005),
            this.mutate(cross[1][index], 0.005)
          );
          tempC[i].push(dub[0]);
          tempC[i + 1].push(dub[1]);
        }
      }
      //console.log(tempC);
      genePoolChromosomes = tempC;
      for (let i = 0; i < 10; i++) {
        genePoolFitness[i] = fitness(genePoolChromosomes[i]);
      }
      console.log(genePoolChromosomes, genePoolFitness); //CONSOLE LOG!!
      let sum = 0;
      genePoolFitness.forEach((e) => {
        sum += e;
      });
      console.log(sum / 10);
      if (genePoolFitness.includes(1)) {
        console.log('HELL YEAHHHS');
        break;
      }
    }
    return [genePoolChromosomes, genePoolFitness];
  };

  let nG = new NaturalGeneticAlgorithm();
  let natural = nG.naturalRun(naturalFitness, 10, 20);
  console.log(natural);
</script>

<div class="top-input">
  <form action="">
    <input type="number" id="length-input" />
    <label for="length-input">Length</label>
  </form>
  <button on:click={onClick}>Start Default</button>
</div>
{#if loop}
  <div class="table-wrapper">
    <div class="chromosome-holder">
      {#each chromosomes[0] as chromosome}
        <Chromosome bind:length bind:placeHolder={chromosome} />
      {/each}
    </div>
    <div class="fitness-holder">
      {#each chromosomes[1] as fitness}
        <span class="fit-span">{fitness}</span>
      {/each}
    </div>
  </div>
{/if}
<div class="phenotype">//</div>

<style>
  .table-wrapper {
    display: flex;
    flex-direction: row;
  }
  .fitness-holder {
    display: flex;
    flex-direction: column;
  }
  .fit-span {
    margin-left: 3px;
    padding-bottom: 12px;
    padding-top: 7px;
  }
</style>
