import React, { useEffect, useState } from 'react';
import DataTable, { defaultThemes } from 'react-data-table-component';

const DataTables = () => {
    const [pending, setPending] = useState(true);
    const [color,searchColor] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    const columns =[
      {
        name: "id",
        selector: row=> row.id,
        sortable: true,
        hide: 'md',
        
      },
      {
        name: "First Name",
        selector: row=> row.first_name,
        sortable: true,
      },
      {
        name: "Last Name",
        selector: row=> row.last_name,
        sortable: true,
        hide: 'md',
      },
      {
        name: "Email",
        selector: row=> row.email,
        sortable: true,
        hide: 'sm',
      },
      {
        name: "Gender",
        selector: row=> row.gender,
        sortable: true,
        hide: 'sm',
      },
      {
        name: "ip address",
        selector: row=> row.ip_address,
        sortable: true,
        hide: 'md',
      },
      {
        name: "Airport Code",
        selector: row=> row.airport_code,
        sortable: true,
        hide: 'md',
      },
      {
        name: "Time",
        selector: row=> row.time,
        sortable: true,
        hide: 'md',
      },
      {
        name: "Status",
        selector: row=> row.status === true ? "True": "False",
        conditionalCellStyles : [
            {
              when: row => row.status === true,
              style: {
                backgroundColor: 'green',
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              },
            },
            {
                when: row => row.status === false,
                style: {
                  backgroundColor: 'red',
                  color: 'white',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                },
              },
          ],
      },
      {
        name: "Mobil",
        selector: row=> row.mobile,
        sortable: true,
      },
      {
        name: "Area",
        selector: row=> row.area,
        sortable: true,
        hide: 'md',
        
      },
      {
        name: "Show",
        selector: row=> row.show === true ? "True" : "False",
        hide: 'md',
      },
      {
        name: "Edit",
        selector: row=> row.edit === true ? "True" : "False",
        hide: 'md',
      },
      {
        name : "Action",
        cell : row=> <button onClick={()=>searchColor(!color)} className="bg-transparent hover:bg-black text-black font-semibold w-full hover:text-white py-2  border border-black hover:border-transparent rounded">Change Color</button>,
        hide: 'md',
      }
    ]

   
    const  conditionalRowStyles =[
        {
            when: row => color === true,
            style: {
              backgroundColor: 'gray',
              color: 'white',
              '&:hover': {
                cursor: 'pointer',
              },
            },
          },
    ]



    const customStyles = {
        	header: {
       		style: {
        			minHeight: '56px',
        		},
        	},
        	headRow: {
        		style: {
        			borderTopStyle: 'solid',
        			borderTopWidth: '1px',
        			borderTopColor: defaultThemes.default.divider.default,
        		},
        	},
        	headCells: {
        		style: {
        			'&:not(:last-of-type)': {
        				borderRightStyle: 'solid',
        				borderRightWidth: '1px',
        				borderRightColor: defaultThemes.default.divider.default,
        			},
        		},
        	},
        	cells: {
        		style: {
        			'&:not(:last-of-type)': {
        				borderRightStyle: 'solid',
        				borderRightWidth: '1px',
        				borderRightColor: defaultThemes.default.divider.default,
        			},
        		},
        	},
        };

    
  
  
    useEffect(()=>{
      fetch("tableData.json")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data)
        setFilteredData(data)
        setPending(false);
      })
      .catch(error => console.log(error));
    },[])


    useEffect(() => {
        const result =data.filter(dt=> {
            return dt.first_name.toLowerCase().match(search.toLowerCase())
        })
        setFilteredData(result)

    },[search,data])
   
    return (
        <DataTable
         columns={columns}
          data={filteredData}
    //    conditionalRowStyles={conditionalRowStyles}
          progressPending={pending}
           pagination
           fixedHeader
           highlightOnHover
           subHeader
           subHeaderComponent={
            <input type='text'
             className='border border-black p-3 rounded-xl'
              placeholder='Search here' 
              value={search}
              onChange={e => setSearch(e.target.value)}
              />
            }
            expandableRows
            expandableRowsComponent={ExpandedComponent}

            customStyles={customStyles}
            dense

            conditionalRowStyles={conditionalRowStyles}
           />
    );
};

export default DataTables;