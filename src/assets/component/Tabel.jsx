import React, { memo } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import foto2 from '../img/foto2.svg';
import { Box, Button, Grid, useTheme } from "@mui/material";
import { talent_employee_status, talent_status_name } from '../style/Theme';
import { useInner } from '../context/InnerContentProvider';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.dark_1.main,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:hover': {
      backgroundColor: theme.palette.action.hover,
   }
}));


const table_contaienr = ({theme})=> ({
   margin: "none", boxShadow: 'none', borderRadius: '10px',
   // border:`1px solid ${theme.palette.border_2.main}`
})


const table_heading = ({theme}) => ({
   padding: '2px 20px', fontSize: '.75rem',
   borderColor:theme.palette.border_1.main
})




// --> 

const CustomizedTables =({talents, size, setSize, page, setPage}) => {

   const { setInnerContent } =useInner() ;



   const [tal, setTal] = React.useState(talents.content || []);

   // console.log(talents)

   React.useEffect(() => {
      setTal(talents.content || []);
   }, [talents]);


   const theme = useTheme()

   const navigate = useNavigate();
   const [pageSize, setPageSize] = React.useState(size);


   const handleClickEntries = (size) => {
      setPageSize(size)
      setSize(size);
      setPage(1);
   };

   const handlePageChange = (event, value) => {
      // console.log("----------> " + value)
      setPage(value);
   };




   return (

      

      <TableContainer component={Paper} sx={table_contaienr({theme})}>
         <Table sx={{ minWidth: 800 }} aria-label="customized table">
            <TableHead sx={{ fontSize: '.9rem' }}>
               <TableRow >
                  <StyledTableCell sx={table_heading({theme})}>Talent </StyledTableCell>
                  <StyledTableCell align="center" sx={table_heading({theme})}>Level</StyledTableCell>
                  <StyledTableCell align="center" sx={table_heading({theme})}>Pengalaman</StyledTableCell>
                  <StyledTableCell align="center" sx={table_heading({theme})}>Status</StyledTableCell>
                  <StyledTableCell align="center" sx={table_heading({theme})}>Kepegawaian</StyledTableCell>
                  <StyledTableCell align="right" sx={table_heading({theme})}>Action</StyledTableCell>
               </TableRow>
            </TableHead>
            <TableBody>



               {tal && tal.length > 0 ? tal.map(talent => (

                  <StyledTableRow key={talent.talentId} sx={{backgroundColor:theme.palette.background.paper, }}>
                     <StyledTableCell component="th" scope="row" sx={{ padding: '5px 20px' , borderColor:theme.palette.border_1.main}}>


                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <img src={talent.talentPhotoUrl == null ? foto2 : talent.talentPhotoUrl} alt={talent.name} style={{ width: 30, height: 30, borderRadius: '50%', marginRight:'10px', overflow:'hidden' }} />
                           {talent.talentName}
                        </Box>

                     </StyledTableCell>
                     <StyledTableCell align="center" sx={{ padding: '5px 10px', borderColor:theme.palette.border_1.main }}>{talent.talentLevelName}</StyledTableCell>



                     <StyledTableCell align="center" sx={{ padding: '5px 10px', borderColor:theme.palette.border_1.main }}>

                        {

                           talent.experience > 5 ? '5+ Tahun' : talent.experience < 5 && talent.experience > 1 ? talent.experience + ' Tahun' : talent.experience < 2 ? talent.experience + ' Tahun' : null

                        }
                     </StyledTableCell>



                     <StyledTableCell align="center" sx={{padding: '0px',padding: '5px 10px', borderColor:theme.palette.border_1.main}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                           <Box sx={talent_status_name({ theme, talent })}>{talent.talentStatusName}</Box>
                        </Box>


                     </StyledTableCell>
                     <StyledTableCell align="center" sx={{ padding: '5px 10px', borderColor:theme.palette.border_1.main }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                           <Box sx={talent_employee_status({theme,talent})}>{talent.employeeStatusName}</Box>
                        </Box>


                     </StyledTableCell>
                     <StyledTableCell align="right" sx={{ padding: '5px 10px', borderColor:theme.palette.border_1.main }}>
                        <IconButton aria-label="view" onClick={() => setInnerContent({ nav: 'detail_talent', talentId: talent.talentId })} >
                           <RemoveRedEyeRoundedIcon />
                        </IconButton>
                        <IconButton aria-label="edit" onClick={() => setInnerContent({ nav: 'edit_talent', talentId: talent.talentId })

                        }

                           sx={{ color: theme.palette.primary.main }}>
                           <DriveFileRenameOutlineRoundedIcon />
                        </IconButton>
                     </StyledTableCell>
                  </StyledTableRow>
               )) :

                  <StyledTableRow>
                     <StyledTableCell colSpan={6} align="center">No talents found</StyledTableCell>
                  </StyledTableRow>



               }
            </TableBody>
         </Table>



         <Box sx={{ padding: '8px' , backgroundColor:theme.palette.background.paper}}>
            <Grid container spacing={2}>
               <Grid item xs={6}>
                  <Box display="flex" alignItems="center" gap={1}>
                     <Typography sx={{ color: theme.palette.dark_1.main, fontWeight: 400, fontSize: '.9rem' }}>
                        Entries
                     </Typography>
                     {[10, 20, 50].map(size => (
                        <Button
                           variant={pageSize === size ? 'contained' : 'text'}
                           key={size}
                           aria-label={`entries-${size}`}
                           size="small"
                           onClick={() => handleClickEntries(size)}
                           sx={{
                              color: theme.palette.dark_1.main,
                              minWidth: 'fit-content',
                              padding: '0',
                              borderRadius: "8px",
                              boxShadow: 'none',
                              backgroundColor: pageSize === size ? theme.palette.primary.main : null,
                           }}
                        >
                           <Box
                              sx={{

                                 fontSize: ".8rem",
                                 height: '26px',
                                 width: '26px',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 color: pageSize === size ? theme.palette.text.white : null,

                              }}
                           >
                              {size}
                           </Box>
                        </Button>
                     ))}
                  </Box>
               </Grid>
               <Grid item xs={6}>
                  <Box display="flex" justifyContent="flex-end">
                     <Pagination
                        count={talents.totalPages}
                        page={page}
                        onChange={handlePageChange}
                        sx={{
                           "& .MuiPaginationItem-root": {

                              fontWeight: '500',
                              width: '26px',
                              height: '26px',
                              padding: '0',
                              minWidth: '0px',
                              borderRadius: '8px',

                              color: theme.palette.dark_1.main,


                              "&.Mui-selected": {
                                 backgroundColor: theme.palette.primary.main,
                                 color: theme.palette.text.white,
                              },
                              "&:hover": {

                              },
                              "&:focus": {

                              },
                           },
                        }}
                     />
                  </Box>
               </Grid>
            </Grid>
         </Box>
      </TableContainer >



   )


}


export default memo(CustomizedTables)