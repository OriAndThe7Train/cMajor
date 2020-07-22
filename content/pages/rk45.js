import { theta1_2P, theta2_2P } from "./pendulumDE";
const m1 = 2;
const m2 = 2;
const g = 9.81;
const L1 = 2;
const L2 = 2;

function eulersMethod([theta1, theta1_1P, theta2, theta2_1P, dt]) {
  var omega2_result =
    theta2_1P +
    theta2_2P(theta1, theta1_1P, theta2, theta2_1P, m1, m2, g, L1, L2) * dt;
  var omega1_result =
    theta1_1P +
    theta1_2P(theta1, theta1_1P, theta2, theta2_1P, m1, m2, g, L1, L2) * dt;

  var theta1_result = theta1 + omega1_result * dt;
  var theta2_result = theta2 + omega2_result * dt;
  return [theta1_result, omega1_result, theta2_result, omega2_result, dt];
}
function rk4([theta1, theta1_1P, theta2, theta2_1P, dt]) {
  // Returns final (position, velocity) array after time dt has passed.
  //        x: initial position
  //        v: initial velocity
  //        a: acceleration function a(x,v,dt) (must be callable)
  //        dt: timestep
  var theta_1_order1 = theta1;
  var omega_1_order1 = theta1_1P;
  var theta_2_order1 = theta2;
  var omega_2_order1 = theta2_1P;
  var alpha_1_order1 = theta1_2P(
    theta_1_order1,
    omega_1_order1,
    theta_2_order1,
    omega_2_order1,
    m1,
    m2,
    g,
    L1,
    L2
  );
  var alpha_2_order1 = theta2_2P(
    theta_1_order1,
    omega_1_order1,
    theta_2_order1,
    omega_2_order1,
    m1,
    m2,
    g,
    L1,
    L2
  );

  var theta_1_order2 = theta1 + 0.5 * omega_1_order1 * dt;
  var omega_1_order2 = theta1_1P + 0.5 * alpha_1_order1 * dt;
  var theta_2_order2 = theta2 + 0.5 * omega_2_order1 * dt;
  var omega_2_order2 = theta2_1P + 0.5 * alpha_2_order1 * dt;
  var alpha_1_order2 = theta1_2P(
    theta_1_order2,
    omega_1_order2,
    theta_2_order2,
    omega_2_order2,
    m1,
    m2,
    g,
    L1,
    L2
  );
  var alpha_2_order2 = theta2_2P(
    theta_1_order2,
    omega_1_order2,
    theta_2_order2,
    omega_2_order2,
    m1,
    m2,
    g,
    L1,
    L2
  );

  var theta_1_order3 = theta1 + 0.5 * omega_1_order2 * dt;
  var omega_1_order3 = theta1_1P + 0.5 * alpha_1_order2 * dt;
  var theta_2_order3 = theta2 + 0.5 * omega_1_order2 * dt;
  var omega_2_order3 = theta1_1P + 0.5 * alpha_2_order2 * dt;
  var alpha_1_order3 = theta1_2P(
    theta_1_order3,
    omega_1_order3,
    theta_2_order3,
    omega_2_order3,
    m1,
    m2,
    g,
    L1,
    L2
  );
  var alpha_2_order3 = theta2_2P(
    theta_1_order3,
    omega_1_order3,
    theta_2_order3,
    omega_2_order3,
    m1,
    m2,
    g,
    L1,
    L2
  );

  var theta_1_order4 = theta1 + omega_1_order3 * dt;
  var omega_1_order4 = theta1_1P + alpha_1_order3 * dt;
  var theta_2_order4 = theta2 + omega_2_order3 * dt;
  var omega_2_order4 = theta2_1P + alpha_2_order3 * dt;
  var alpha_1_order4 = theta1_2P(
    theta_1_order4,
    omega_1_order4,
    theta_2_order4,
    omega_2_order4,
    m1,
    m2,
    g,
    L1,
    L2
  );
  var alpha_2_order4 = theta2_2P(
    theta_1_order4,
    omega_1_order4,
    theta_2_order4,
    omega_2_order4,
    m1,
    m2,
    g,
    L1,
    L2
  );

  var theta_1_result =
    theta1 +
    (dt / 6) *
      (omega_1_order1 +
        2 * omega_1_order2 +
        2 * omega_1_order3 +
        omega_1_order4);
  var theta_2_result =
    theta2 +
    (dt / 6) *
      (omega_2_order1 +
        2 * omega_2_order2 +
        2 * omega_2_order3 +
        omega_2_order4);
  var omega_1_result =
    theta1_1P +
    (dt / 6) *
      (alpha_1_order1 +
        2 * alpha_1_order2 +
        2 * alpha_1_order3 +
        alpha_1_order4);
  var omega_2_result =
    theta2_1P +
    (dt / 6) *
      (alpha_2_order1 +
        2 * alpha_2_order2 +
        2 * alpha_2_order3 +
        alpha_2_order4);

  return [
    theta_1_result,
    omega_1_result * 0.99999,
    theta_2_result,
    omega_2_result * 0.99999,
    dt,
  ];
}

export { eulersMethod, rk4 };
