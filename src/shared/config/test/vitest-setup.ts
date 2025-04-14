/// <reference types="vitest/globals" />

import '@testing-library/jest-dom'

import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})
