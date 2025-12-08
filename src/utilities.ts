// SPDX-FileCopyrightText: Copyright (C) 2023-2025 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

import * as _ from "lodash-es";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function defaults<T extends Record<string, any>>(props: Partial<T>, fallbackProps: T): T {
  return _.defaults<Partial<T>, T>({ ...props }, fallbackProps);
}

/**
 * Helper function to access private methods for testing purposes
 */
function getPrivateMethod<T, K extends keyof T>(instance: T, methodName: K): T[K] {
  return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), methodName)?.value;
}

/**
 * Helper function to call private methods for testing purposes
 * Usage: callPrivateMethod(instance, 'privateMethodName', arg1, arg2);
 * @param instance - The instance containing the private method
 * @param methodName - The name of the private method
 * @param args - Arguments to pass to the private method
 */

export function callPrivateMethod<T, K extends keyof T, R = void>(
  instance: T,
  methodName: K,
  ...args: unknown[]
): R {
  const method = getPrivateMethod(instance, methodName) as (...args: unknown[]) => R;
  return method.call(instance, ...args);
}
