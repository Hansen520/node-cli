/*
 * @Date: 2024-11-28 14:56:51
 * @Description: test
 */
import si from 'systeminformation';

// si.currentLoad(data => {
//   console.log(data);
// })

// si.fsSize(data => {
//     console.log(data);
// });

// si.mem(data => {
//     console.log(data);
// })

// si.networkInterfaceDefault(iface => {
//     console.log(iface);
//     si.networkStats(iface, data => {
//         console.log(data);
//     })
// });


si.processes(data => {
    console.log(data);
})