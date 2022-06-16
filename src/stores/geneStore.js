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
        this.crossover(this.mutate(cross[0], 0.06), this.mutate(cross[1], 0.06))
      );
    }
    //console.log(tempC);
    genePoolChromosomes = tempC;
    for (let x = 0; x < 10; x++) {
      genePoolFitness[x] = fitness(genePoolChromosomes[x], '1111111111');
    }

    console.log(genePoolChromosomes, genePoolFitness); //CONSOLE LOG!!
    if (genePoolFitness.includes(1)) {
      console.log('HELL YEAHHHS');
      break;
    }
  }
};

g.run(fitness, 10, 30);
