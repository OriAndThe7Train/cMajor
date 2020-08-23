function theta1_2P(
  theta_1,
  omega_1,
  theta_2,
  omega_2,
  v,
  m1,
  m2,
  mc,
  g,
  L1,
  L2,
  c,
  force
) {
  const theta1dd =
    -(
      g * Math.pow(m1, 2) * Math.sin(theta_1) -
      (m2 * force * Math.cos(theta_1 - 2 * theta_2)) / 2 +
      m1 * Math.cos(theta_1) * force +
      (m2 * Math.cos(theta_1) * force) / 2 +
      (c * m2 * v * Math.cos(theta_1 - 2 * theta_2)) / 2 -
      c * m1 * Math.cos(theta_1) * v -
      (c * m2 * Math.cos(theta_1) * v) / 2 +
      (L1 * Math.pow(m1, 2) * Math.sin(2 * theta_1) * Math.pow(omega_1, 2)) /
        2 +
      (g * m2 * mc * Math.sin(theta_1 - 2 * theta_2)) / 2 +
      g * m1 * m2 * Math.sin(theta_1) +
      g * m1 * mc * Math.sin(theta_1) +
      (g * m2 * mc * Math.sin(theta_1)) / 2 +
      (L1 *
        m2 *
        mc *
        Math.sin(2 * theta_1 - 2 * theta_2) *
        Math.pow(omega_1, 2)) /
        2 +
      (L2 * m1 * m2 * Math.sin(theta_1 + theta_2) * Math.pow(omega_2, 2)) / 2 +
      (L1 * m1 * m2 * Math.sin(2 * theta_1) * Math.pow(omega_1, 2)) / 2 +
      (L2 * m1 * m2 * Math.sin(theta_1 - theta_2) * Math.pow(omega_2, 2)) / 2 +
      L2 * m2 * mc * Math.sin(theta_1 - theta_2) * Math.pow(omega_2, 2)
    ) /
    (L1 *
      ((m1 * m2) / 2 +
        m1 * mc +
        (m2 * mc) / 2 +
        Math.pow(m1, 2) / 2 -
        (Math.pow(m1, 2) * Math.cos(2 * theta_1)) / 2 -
        (m2 * mc * Math.cos(2 * theta_1 - 2 * theta_2)) / 2 -
        (m1 * m2 * Math.cos(2 * theta_1)) / 2));

  return theta1dd;
}

function theta2_2P(
  theta_1,
  omega_1,
  theta_2,
  omega_2,
  v,
  m1,
  m2,
  mc,
  g,
  L1,
  L2,
  c,
  force
) {
  const theta2dd =
    ((m1 * Math.cos(2 * theta_1 - theta_2) * force) / 2 -
      (m2 * Math.cos(theta_2) * force) / 2 -
      (m1 * Math.cos(theta_2) * force) / 2 +
      (m2 * Math.cos(2 * theta_1 - theta_2) * force) / 2 +
      (g * m1 * mc * Math.sin(2 * theta_1 - theta_2)) / 2 +
      (g * m2 * mc * Math.sin(2 * theta_1 - theta_2)) / 2 +
      (c * m1 * Math.cos(theta_2 * v)) / 2 +
      (c * m2 * Math.cos(theta_2 * v)) / 2 -
      (c * m1 * Math.cos(2 * theta_1 - theta_2 * v)) / 2 -
      (c * m2 * Math.cos(2 * theta_1 - theta_2 * v)) / 2 -
      (g * m1 * mc * Math.sin(theta_2)) / 2 -
      (g * m2 * mc * Math.sin(theta_2)) / 2 +
      (L2 *
        m2 *
        mc *
        Math.sin(2 * theta_1 - 2 * theta_2) *
        Math.pow(omega_2, 2)) /
        2 +
      L1 * m1 * mc * Math.sin(theta_1 - theta_2) * Math.pow(omega_1, 2) +
      L1 * m2 * mc * Math.sin(theta_1 - theta_2) * Math.pow(omega_1, 2)) /
    (L2 *
      ((m1 * m2) / 2 +
        m1 * mc +
        (m2 * mc) / 2 +
        Math.pow(m1, 2) / 2 -
        (Math.pow(m1, 2) * Math.cos(2 * theta_1)) / 2 -
        (m2 * mc * Math.cos(2 * theta_1 - 2 * theta_2)) / 2 -
        (m1 * m2 * Math.cos(2 * theta_1)) / 2));
  return theta2dd;
}

function x_2P(
  theta_1,
  omega_1,
  theta_2,
  omega_2,
  v,
  m1,
  m2,
  mc,
  g,
  L1,
  L2,
  c,
  force
) {
  const xdd =
    (2 * m1 * force +
      m2 * force +
      -2 * c * m1 * v -
      c * m2 * v +
      g * Math.pow(m1, 2) * Math.sin(2 * theta_1) -
      m2 * Math.cos(2 * theta_1 - 2 * theta_2) * force +
      2 * L1 * Math.pow(m1, 2) * Math.sin(theta_1) * Math.pow(omega_1, 2) +
      g * m1 * m2 * Math.sin(2 * theta_1) +
      c * m2 * Math.cos(2 * theta_1 - 2 * theta_2) * v +
      2 * L1 * m1 * m2 * Math.sin(theta_1) * Math.pow(omega_1, 2) +
      L2 * m1 * m2 * Math.sin(theta_2) * Math.pow(omega_2, 2) +
      L2 * m1 * m2 * Math.sin(2 * theta_1 - theta_2) * Math.pow(omega_2, 2)) /
    (m1 * m2 +
      2 * m1 * mc +
      m2 * mc +
      Math.pow(m1, 2) -
      Math.pow(m1, 2) * Math.cos(2 * theta_1) -
      m2 * mc * Math.cos(2 * theta_1 - 2 * theta_2) -
      m1 * m2 * Math.cos(2 * theta_1));
  return xdd;
}

export { theta1_2P, theta2_2P, x_2P };
