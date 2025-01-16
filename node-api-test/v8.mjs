/*
 * @Date: 2025-01-16 15:42:02
 * @Description: description
 */
import v8 from 'node:v8';

// console.log(v8.getHeapSpaceStatistics());

// console.log(v8.getHeapStatistics());

v8.setFlagsFromString('--trace_gc');
