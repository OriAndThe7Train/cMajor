function theta1_2P(theta_1, omega_1, theta_2, omega_2, m1, m2, g, L1, L2) {
  const term1 = -g * (2 * m1 + m2) * Math.sin(theta_1);
  const term2 = -m2 * g * Math.sin(theta_1 - 2 * theta_2);
  const term3 =
    -2 *
    Math.sin(theta_1 - theta_2) *
    m2 *
    (Math.pow(omega_2, 2) * L2 +
      Math.pow(omega_1, 2) * L1 * Math.cos(theta_1 - theta_2));
  const term4 = L1 * (2 * m1 + m2 - m2 * Math.cos(2 * theta_1 - 2 * theta_2));

  return (term1 + term2 + term3) / term4;
}

function theta2_2P(theta_1, omega_1, theta_2, omega_2, m1, m2, g, L1, L2) {
  const term1 = 2 * Math.sin(theta_1 - theta_2);
  const term2 = Math.pow(omega_1, 2) * L1 * (m1 + m2);
  const term3 = g * (m1 + m2) * Math.cos(theta_1);
  const term4 = Math.pow(omega_2, 2) * L2 * m2 * Math.cos(theta_1 - theta_2);
  const term5 = L2 * (2 * m1 + m2 * (1 - Math.cos(2 * theta_1 - 2 * theta_2)));

  return (term1 * (term2 + term3 + term4)) / term5;
}

export { theta1_2P, theta2_2P };
