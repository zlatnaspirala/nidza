
import { Utility } from "nidza";

/**
 * @description Examples loader handler
 * I use async loading script.
 */

Utility.loadAsync("builds/" + Utility.QueryUrl().u, () => { // DEV
// Utility.importAsync("js/" + Utility.QueryUrl().u, () => { // DEV
  console.info('Application runned.')
});