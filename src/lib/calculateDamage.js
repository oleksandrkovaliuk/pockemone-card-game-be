const calculateDamage = (level, power, attack, defense, randomFactor) => {
  const checkRandomFactor = Math.max(0, Math.min(1, randomFactor));

  const damage = Math.floor(
    ((((2 * level) / 5 + 2) * power * (attack / defense)) / 50 + 2) *
      checkRandomFactor
  );

  return damage;
};

module.exports = calculateDamage;
