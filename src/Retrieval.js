// import React, { useState } from 'react';

// function Retrievals() {
//   const [hsqc, setHSQC] = useState('');
//   const [c_nmr, setC_NMR] = useState('');
//   const [h_nmr, setH_NMR] = useState('');
//   const [mw, setMW] = useState('');
//   const [retrievals, setRetrievals] = useState([]);


//   const fetchData = async () => {
//     const response = await fetch('http://localhost:6660/generate-retrivals', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ "HSQC":hsqc,
//                             "C_NMR": c_nmr,
//                             "H_NMR": h_nmr, 
//                             "MW":mw}),
//     });
//     const data = await response.json();
//     setRetrievals(data.retrivals);
//   };

//   const test_hello = async () => {
//     const response = await fetch('http://localhost:6660/hello', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await response.json();
//     console.log(data);
//     alert(data['retrievals']);
//   }

//   return (
//     <div>
//       <h1>NMR Data Retrieval</h1>
//       <div>
//         <label>
//           HSQC:
//           <textarea
//             value={hsqc}
//             onChange={(e) => setHSQC(e.target.value)}
//             placeholder="Enter HSQC data"
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           C NMR:
//           <textarea
//             value={c_nmr}
//             onChange={(e) => setC_NMR(e.target.value)}
//             placeholder="Enter C NMR data"
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           H NMR:
//           <textarea
//             value={h_nmr}
//             onChange={(e) => setH_NMR(e.target.value)}
//             placeholder="Enter H NMR data"
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Molecular Weight:
//           <textarea
//             value={mw}
//             onChange={(e) => setMW(e.target.value)}
//             placeholder="Enter MW data"
//           />
//         </label>
//       </div>
//       <button onClick={test_hello}>Generate Retrievals</button>
//       {/* <div>
//         {retrievals.length > 0 && (
//           <div>
//             <h2>Retrieved Data:</h2>
//             <ul>
//               {retrievals.map((retrieval, index) => (
//                 <li key={index}>{retrieval}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div> */}

//       <h1>Image Gallery</h1>
//       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//         {retrievals.map(([smiles, name, base64_img], index) => (
//           <div key={index} style={{ margin: '10px', textAlign: 'center' }}>
//             <img 
//               src={`data:image/png;base64,${base64_img}`} 
//               alt={name} 
//               style={{ width: '200px', height: '200px' }} 
//             />
//             <h2>{name}</h2>
//             <p>{smiles}</p>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

// export default Retrievals;
