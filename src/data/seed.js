window.Seed = (function () {
    function generateVoteCount() {
      return Math.floor((Math.random() * 50) + 15);
    }
  
    const cars = [
      {
        id: 1,
        brand:'FengTian',
        style:'Kaluola',
        votes: generateVoteCount(),
        details:{
          fuelTankCapacity:"50L",
          fuelConsumption:"7.1L/100km",
          maximumSpeed:"180km/h",
          seetCapacity:5,
        },
      },
      {
        id: 2,
        brand:'BENZ',
        style:'Sprinter',
        votes: generateVoteCount(),
        details:{
          fuelTankCapacity:"100L",
          fuelConsumption:"13.5L/100km",
          maximumSpeed:"161km/h",
          seetCapacity:9,
        },
      },
      {
        id: 3,
        brand:'Ford',
        style:'focus',
        votes: generateVoteCount(),
        details:{
          fuelTankCapacity:"53L",
          fuelConsumption:"5.4L/100km",
          maximumSpeed:"193km/h",
          seetCapacity:5,
        },
      },
      {
        id: 4,
        brand:'Chevrolet',
        style:'Camaro',
        votes: generateVoteCount(),
        details:{
          fuelTankCapacity:"72L",
          fuelConsumption:"8.1L/100km",
          maximumSpeed:"240km/h",
          seetCapacity:4,
        },
      },
    ];
  
    return { cars: cars };
  }());
  