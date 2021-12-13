const avatarImages = [
  "https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1639355020~hmac=e9247db153a478004fa1ab5d71ac43ce",
  "https://cdn-icons.flaticon.com/png/512/706/premium/706807.png?token=exp=1639355020~hmac=0e2a2ab7bba80a82666a38ee556d170d",
  "https://cdn-icons.flaticon.com/png/512/1785/premium/1785896.png?token=exp=1639355020~hmac=02014f3256055d3793fd78ee8da1da91",
  "https://cdn-icons.flaticon.com/png/512/4134/premium/4134175.png?token=exp=1639355020~hmac=54bfc0d713ab28f6be2b318b9b86cdee",
  "https://cdn-icons-png.flaticon.com/512/924/924874.png",
  "https://cdn-icons.flaticon.com/png/512/805/premium/805387.png?token=exp=1639355020~hmac=3e2f7f667203c38d2fc84617b3d40f63",
  "https://cdn-icons.flaticon.com/png/512/3253/premium/3253366.png?token=exp=1639355020~hmac=51952fcfbdaaf7bf1b5912b34ddca6f2",
  "https://cdn-icons.flaticon.com/png/512/805/premium/805370.png?token=exp=1639355020~hmac=92076295495a4bddefbe3c96597459ed",
  "https://cdn-icons-png.flaticon.com/512/6373/6373499.png",
];

const getRandomAvatarUrl = () => {
  return avatarImages[Math.floor(Math.random() * avatarImages.length)];
};

module.exports.getRandomAvatarUrl = getRandomAvatarUrl;
