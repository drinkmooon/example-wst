window.Seed = (function () {
    function generateVoteCount() {
      return Math.floor((Math.random() * 50) + 15);
    }
  
    const cars = [
      {
        id: 1,
        title: 'Yellow Pail',
        description: 'On-demand sand castle construction expertise.',
        brand:'TOYOTA',
        style:'ZRE120',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/daniel.jpg',
        productImageUrl: 'images/products/image-aqua.png',
      },
      {
        id: 2,
        title: 'Supermajority: The Fantasy Congress League',
        description: 'Earn points when your favorite politicians pass legislation.',
        brand:'BENZ',
        style:'Sprinter',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/kristy.png',
        productImageUrl: 'images/products/image-rose.png',
      },
      {
        id: 3,
        title: 'Tinfoild: Tailored tinfoil hats',
        description: 'We already have your measurements and shipping address.',
        brand:'Ford',
        style:'focus',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/veronika.jpg',
        productImageUrl: 'images/products/image-steel.png',
      },
      {
        id: 4,
        title: 'Haught or Naught',
        description: 'High-minded or absent-minded? You decide.',
        brand:'Chevrolet',
        style:'VengaSoul',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/molly.png',
        productImageUrl: 'images/products/image-yellow.png',
      },
    ];
  
    return { cars: cars };
  }());
  