/*
 * @Date: 2025-01-16 14:48:27
 * @Description: description
 */
import vm from 'node:vm';

const context = {
    console,
    han: 111,
    sen: 222,
}

vm.createContext(context);

vm.runInContext('console.log(han + sen)', context);
