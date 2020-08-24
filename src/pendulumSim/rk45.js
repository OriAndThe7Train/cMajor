import { theta1_2P, theta2_2P, x_2P } from "./pendulumDE"
const m1 = 20 // pendulum bob 1 mass
const m2 = 20 // pendulum bob 2 mass
const mc = 50 // mass of cart
const g = 9.81 //gravity
const L1 = 2 // length of pendulum 1
const L2 = 2 // length of pendulum 2
const c = 80 // rayleigh damping (friction) coeff

function rk4([theta1, theta1_1P, theta2, theta2_1P, x, v, force, dt]) {
  if (x > 10 || x < -10) {
    v = -0.95 * v
  }
  var theta_1_order1 = theta1
  var omega_1_order1 = theta1_1P
  var theta_2_order1 = theta2
  var omega_2_order1 = theta2_1P
  var x_order1 = x
  var v_order1 = v

  var appliedForce = force
  var alpha_1_order1 = theta1_2P(
    theta_1_order1,
    omega_1_order1,
    theta_2_order1,
    omega_2_order1,
    v_order1,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )

  var alpha_2_order1 = theta2_2P(
    theta_1_order1,
    omega_1_order1,
    theta_2_order1,
    omega_2_order1,
    v_order1,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )

  var x_acceleration_order1 = x_2P(
    theta_1_order1,
    omega_1_order1,
    theta_2_order1,
    omega_2_order1,
    v_order1,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )

  var theta_1_order2 = theta1 + 0.5 * omega_1_order1 * dt
  var omega_1_order2 = theta1_1P + 0.5 * alpha_1_order1 * dt
  var theta_2_order2 = theta2 + 0.5 * omega_2_order1 * dt
  var omega_2_order2 = theta2_1P + 0.5 * alpha_2_order1 * dt
  var x_order2 = x + 0.5 * v_order1 * dt
  var v_order2 = v + 0.5 * x_acceleration_order1 * dt

  var alpha_1_order2 = theta1_2P(
    theta_1_order2,
    omega_1_order2,
    theta_2_order2,
    omega_2_order2,
    v_order2,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )
  var alpha_2_order2 = theta2_2P(
    theta_1_order2,
    omega_1_order2,
    theta_2_order2,
    omega_2_order2,
    v_order2,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )

  var x_acceleration_order2 = x_2P(
    theta_1_order2,
    omega_1_order2,
    theta_2_order2,
    omega_2_order2,
    v_order2,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )

  var theta_1_order3 = theta1 + 0.5 * omega_1_order2 * dt
  var omega_1_order3 = theta1_1P + 0.5 * alpha_1_order2 * dt
  var theta_2_order3 = theta2 + 0.5 * omega_1_order2 * dt
  var omega_2_order3 = theta1_1P + 0.5 * alpha_2_order2 * dt
  var x_order3 = x + 0.5 * v_order2 * dt
  var v_order3 = v + 0.5 * x_acceleration_order2 * dt
  var alpha_1_order3 = theta1_2P(
    theta_1_order3,
    omega_1_order3,
    theta_2_order3,
    omega_2_order3,
    v_order3,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )
  var alpha_2_order3 = theta2_2P(
    theta_1_order3,
    omega_1_order3,
    theta_2_order3,
    omega_2_order3,
    v_order3,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )

  var x_acceleration_order3 = x_2P(
    theta_1_order3,
    omega_1_order3,
    theta_2_order3,
    omega_2_order3,
    v_order3,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )

  var theta_1_order4 = theta1 + omega_1_order3 * dt
  var omega_1_order4 = theta1_1P + alpha_1_order3 * dt
  var theta_2_order4 = theta2 + omega_2_order3 * dt
  var omega_2_order4 = theta2_1P + alpha_2_order3 * dt
  var x_order4 = x + v_order3 * dt
  var v_order4 = v + x_acceleration_order3 * dt

  var alpha_1_order4 = theta1_2P(
    theta_1_order4,
    omega_1_order4,
    theta_2_order4,
    omega_2_order4,
    v_order4,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )
  var alpha_2_order4 = theta2_2P(
    theta_1_order4,
    omega_1_order4,
    theta_2_order4,
    omega_2_order4,
    v_order4,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )

  var x_acceleration_order4 = x_2P(
    theta_1_order4,
    omega_1_order4,
    theta_2_order4,
    omega_2_order4,
    v_order4,
    m1,
    m2,
    mc,
    g,
    L1,
    L2,
    c,
    appliedForce
  )

  var theta_1_result =
    theta1 +
    (dt / 6) *
      (omega_1_order1 +
        2 * omega_1_order2 +
        2 * omega_1_order3 +
        omega_1_order4)
  var theta_2_result =
    theta2 +
    (dt / 6) *
      (omega_2_order1 +
        2 * omega_2_order2 +
        2 * omega_2_order3 +
        omega_2_order4)
  var omega_1_result =
    theta1_1P +
    (dt / 6) *
      (alpha_1_order1 +
        2 * alpha_1_order2 +
        2 * alpha_1_order3 +
        alpha_1_order4)
  var omega_2_result =
    theta2_1P +
    (dt / 6) *
      (alpha_2_order1 +
        2 * alpha_2_order2 +
        2 * alpha_2_order3 +
        alpha_2_order4)

  var x_result =
    x + (dt / 6) * (v_order1 + 2 * v_order2 + 2 * v_order3 + v_order4)

  var v_result =
    v +
    (dt / 6) *
      (x_acceleration_order1 +
        2 * x_acceleration_order2 +
        2 * x_acceleration_order3 +
        x_acceleration_order4)

  return [
    theta_1_result,
    omega_1_result,
    theta_2_result,
    omega_2_result,
    x_result,
    v_result,
    appliedForce,
    dt,
  ]
}

export { rk4 }
