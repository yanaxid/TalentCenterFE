import React, { useState } from 'react';
import { Box, TextField, Button, useTheme, IconButton, styled, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, OutlinedInput, MenuItem, Chip } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import SelectCustom from './SelectCutom';
import DatePickerCustom from './DatePickerCustom';
import MultipleSelect from './MultipleSelect';
import toast from 'react-hot-toast';
import { getTalentDetail, postTalent, putTalent } from '../services/apis';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { LoadingButton } from '@mui/lab';
import { useInner } from '../context/InnerContentProvider';






const positions = [
   { positionId: "1a090f11-5e0d-4f10-8c0a-59ecba915f1a", positionName: "Web Developer" },
   { positionId: "b02a1f42-6e12-4b8b-9a62-82e3e7b86a44", positionName: "Scrum Master" },
   { positionId: "dc6a9351-48f2-464f-a758-438918ee3a8c", positionName: "Analyst" },
   { positionId: "16cb24d4-0ac3-41e9-90c2-94cb35b3cc6d", positionName: "Web Front-End Developer" },
   { positionId: "e9d63f1a-d9c5-4d6e-9d0f-06f6f6ed752a", positionName: "Web Back-End Developer" },
   { positionId: "a594d4ea-c079-4294-943d-2b78f2e9a5c1", positionName: "Quality Assurance" },
   { positionId: "c1d23a9a-568f-4dab-92c2-78e5bbab3a6a", positionName: "UI/UX Designer" },
   { positionId: "e176b792-049e-40b2-91b0-62dd2f3a401b", positionName: "Project Manager" },
   { positionId: "86ac9ef9-90a5-412f-90fc-5ceff7be0a31", positionName: "Android Developer" },
   { positionId: "e6b01a8c-237c-4ff5-9557-1eeeec09214c", positionName: "Desktop Developer" },
   { positionId: "166eb76f-e198-4ac1-aa82-91d3ac2c37a5", positionName: "Video Game Developer" },
   { positionId: "3bf9a3fb-d132-49fa-b017-c3866c4888ad", positionName: "Graphics Programmer" },
   { positionId: "53924716-e09b-4295-9e80-e4b2111d671c", positionName: "IOS Developer" },
   { positionId: "65188a20-9200-48a9-a1a6-a748899c7c90", positionName: "Software Engineer" }
];


const skillsets = [
   { skillsetId: "ea7fa05e-6586-4bd9-b293-1f762d6ee258", skillName: "C++" },
   { skillsetId: "d50dfab2-a97c-4534-8676-0a7355f1d303", skillName: "Golang" },
   { skillsetId: "ee828ba1-c5b7-4815-8d9e-208122722614", skillName: "Python" },
   { skillsetId: "d3e51a73-407e-4176-9c8b-5073bd9ce657", skillName: "Ruby" },
   { skillsetId: "1fc9f28e-2302-43d0-8fc4-ef9905f23f16", skillName: "Spring Boot" },
   { skillsetId: "7abe1a4f-86fc-46a8-be41-51e8533e2654", skillName: "ReactJS" },
   { skillsetId: "0e39324c-97b8-4868-87d6-d82584769242", skillName: "Java" },
   { skillsetId: "8431ff69-f7b5-4401-a331-310eb8139583", skillName: ".NET" },
   { skillsetId: "5fbd86ab-f44c-4ab5-9a6b-21483098d9a1", skillName: "C#" },
   { skillsetId: "3520ca2e-561a-48c4-9e3e-87749ff154da", skillName: "C" },
   { skillsetId: "710030ca-9995-4e70-8b55-7bc165ad09f3", skillName: "PHP" },
   { skillsetId: "36270eaa-6aa0-462d-81e0-dbc95a56a2e4", skillName: "Angular" },
   { skillsetId: "22a52814-2872-4994-98da-de5c075cb0e2", skillName: "Laravel" },
   { skillsetId: "98e192b3-d854-4140-8e82-490bae5569b3", skillName: "Selenium" },
   { skillsetId: "63f3d6d5-71d8-48e2-825a-bed7feadd234", skillName: "Swift" },
   { skillsetId: "55291562-0ed6-420b-881a-6e77186d7141", skillName: "Ruby On Rails" },
   { skillsetId: "b4e68b15-1e7a-46c1-bfc1-4880252007c2", skillName: "Trello" },
   { skillsetId: "3c21e793-2c66-4859-9515-727b537f8e79", skillName: "Katalon" },
   { skillsetId: "d52e18a6-b5bb-4c0a-bcfc-3ae0734e202d", skillName: "CodeIgniter" },
   { skillsetId: "d88c669d-e35f-4ae3-8404-6d11a8467db3", skillName: "Figma" }
];



const ErrorMessage = ({ fieldName, errors, theme }) => {
   return (
      errors[fieldName] && (
         <Typography
            color={theme.palette.error.main}
            sx={{ fontSize: '0.67rem', marginTop: '4px' }}
         >
            {errors[fieldName].message}
         </Typography>
      )
   );
};



const getDateSubstring = (value) => {
   return String(value).substring(0, 10)
}

const convertDateFromSlash = (value) => {
   const [month, day, year] = value.split('/');
   const tanggal = `${year}-${month}-${day}`;
   return tanggal
}

const convertDateFromDash = (value) => {
   const [year, month, day] = value.split('-');
   const tanggal = `${month}/${day}/${year}`
   return tanggal
}




const ContentAddTalent = () => {



   const { innerContent, setInnerContent } = useInner()
   const [talent, setTalent] = React.useState({});
   const [loading, setLoading] = React.useState(false);






   // fetch talent detail
   const fetchDataTalent = React.useCallback(
      async (talentId) => {
         try {
            const response = await getTalentDetail(talentId);
            setTimeout(() => {
               setTalent(response.data);
            }, 1);
            console.log(response.data);
         } catch (error) {
            console.log("error heeey");
         }
      },
      []
   )


   React.useEffect(() => {

      if (innerContent != null) {
         fetchDataTalent(innerContent.talentId);
      }

   }, []);





   const theme = useTheme()



   const style = ({ theme }) => ({
      borderRadius: '7px',
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      '& .MuiInputLabel-root': {
         top: '-4px',
         fontSize: '.85rem',


         '&.Mui-focused, &.MuiInputLabel-shrink': {
            transform: 'translate(11px, -4px) scale(0.75)',
         },
      },
      '& .MuiOutlinedInput-root': {
         borderRadius: '7px',
         fontSize: '.9rem',
         fontWeight: '400',
         paddingLeft: '6px',
         '& fieldset': {
            borderColor: theme.palette.border_1.main, // Mengubah warna border default
         }

      },
      '& .MuiInputBase-input': {
         height: '14px',
         padding: '10px',

      },



   })


   const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm();



   const onSubmit = async (data) => {

      setLoading(true);
      try {



         const formattedPositions = posisi.map(id => ({ positionId: id }));
         const formattedSkillsets = skill.map(id => ({ skillsetId: id }));

         const result = {
            talentName: talent.talentName,
            talentStatus: "feee9f36-a978-455d-b324-9d360421d068",
            nip: talent.nip,
            sex: talent.sex,
            dob: convertDateFromSlash(dob),
            talentDescription: talent.talentDescription,
            employeeStatus: cekEmpStatus(talent.employeeStatus),
            talentAvailability: talent.talentAvailability,
            talentExperience: talent.talentExperience,
            talentLevel: cekLevel(talent.talentLevel),
            email: talent.email,
            positions: formattedPositions,
            skillsets: formattedSkillsets,
            cellphone: talent.cellphone

         };




         console.log(photoFile)
         await putTalent(result, photoFile, cvFile, talent.talentId);
         toast.success('Berhasil update data ')
         console.log(result)

         // handleReset()
         setInnerContent({ nav: 'detail_talent', talentId: talent.talentId })
         // console.log("Talent data successfully saved!");

      } catch (error) {



         let errorMessage = 'Gagal tambah data';


         if (error.response) {

            console.log('yaaaaaa')
            console.log(error.response.data.errors[0].meta.errorSources);
            errorMessage = String(Object.values(error.response.data.errors[0].meta.errorSources))




         }

         toast.error(errorMessage);
      } finally {
         setLoading(false);
      }
   };



   // LEVEL
   const filterOptions = [
      // { value: "", label: "None" },
      { value: "e0c3c066-2ac2-40bf-971b-2de2c9003be6", label: "Junior" },
      { value: "64d5512c-bd45-4211-97e0-2b069b264d05", label: "Middle" },
      { value: "22848659-c9e8-4df4-bd86-24c215442db3", label: "Senior" },
   ];

   const filterKepegawaian = [
      // { value: "", label: "None" },
      { value: "82dacb82-f0d6-4a09-9acb-ad67a2d9809e", label: "Active" },
      { value: "7d39f674-dd1e-4f6d-8436-11e1a162734b", label: "Not Active" }
   ];


   const talentEvailability = [
      // { value: "", label: "None" },
      { value: true, label: "Available" },
      { value: false, label: "Non Available" }
   ];



   const cekLevel = (level) => {
      if (level == 'Junior' || level == 'e0c3c066-2ac2-40bf-971b-2de2c9003be6') {
         return 'e0c3c066-2ac2-40bf-971b-2de2c9003be6'
      } else if (level == 'Middle' || level == '64d5512c-bd45-4211-97e0-2b069b264d05') {
         return '64d5512c-bd45-4211-97e0-2b069b264d05'

      } else if (level == 'Senior' || level == '22848659-c9e8-4df4-bd86-24c215442db3') {
         return '22848659-c9e8-4df4-bd86-24c215442db3'

      } else {
         return ''
      }
   }

   const cekEmpStatus = (estatus) => {
      if (estatus == 'Active' || estatus == '82dacb82-f0d6-4a09-9acb-ad67a2d9809e') {
         return '82dacb82-f0d6-4a09-9acb-ad67a2d9809e'
      } else if (estatus == 'Not Active' || estatus == '7d39f674-dd1e-4f6d-8436-11e1a162734b') {
         return '7d39f674-dd1e-4f6d-8436-11e1a162734b'

      } else {
         return ''
      }
   }


   const cekAvail = (avail) => {
      if (avail == true) {
         return true
      } else if (avail == false) {
         return false
      }
   }








   const [employeeStatus, setEmployeeStatus] = React.useState('');
   const handleEmployeeStatus = React.useCallback((event) => {
      setEmployeeStatus(event.target.value);
   }, []);




   const handleReset = () => {
      reset()
      setTalentLevel('')
      setEmployeeStatus('')
      setPosisi([])
      setSkill([])
   }




   const [posisi, setPosisi] = React.useState([]);
   const [skill, setSkill] = React.useState([]);




   React.useEffect(() => {
      if (talent.skillSet) {
         const arrSkill = talent.skillSet.map(pos => pos.skillsetId);
         setSkill(arrSkill);
      }
   }, [talent.skillSet])



   React.useEffect(() => {
      if (talent.employeeStatus) {
         // console.log(cekEmpStatus(talent.employeeStatus));
      }
   }, [talent.employeeStatus]);


   const [cvFileName, setCvFileName] = React.useState();


   React.useEffect(() => {
      if (talent.cv) {
         // console.log(setCvFileName(talent.cv));
      }

   }, [talent.cv]);







   const [photoFile, setPhotoFile] = React.useState(null);
   const [cvFile, setCvFile] = React.useState(null);
   const [dob, setDob] = useState('')

   const handleTglRequest = React.useCallback((event) => {
      const { value } = event.target;

      if (value == '') {
         console.log('--------------------------------- ksosong' + value)
         setDob('');
      } else {
         const tanggal = convertDateFromDash(value)
         console.log('---------------------------------' + value)
         setDob(tanggal);
      }


   }, []);




   React.useEffect(() => {
      if (talent.talentName) {
         setValue('talentName', talent.talentName);
      }
   }, [talent.talentName, setValue]);


   React.useEffect(() => {
      if (talent.nip) {
         setValue('nip', talent.nip);
      }
   }, [talent.nip, setValue]);

   React.useEffect(() => {
      if (talent.talentDescription) {
         setValue('talentDescription', talent.talentDescription);
      }
   }, [talent.talentDescription, setValue]);

   React.useEffect(() => {
      if (talent.talentExperience) {
         setValue('talentExperience', talent.talentExperience);
      }
   }, [talent.talentExperience, setValue]);


   React.useEffect(() => {
      if (talent.talentLevel) {
         setValue('talentLevel', talent.talentLevel);
      }
   }, [talent.talentLevel, setValue]);

   React.useEffect(() => {
      if (talent.email) {
         setValue('email', talent.email);
      }
   }, [talent.email, setValue]);

   React.useEffect(() => {
      if (talent.cellphone) {
         setValue('cellphone', talent.cellphone);
      }
   }, [talent.cellphone, setValue]);

   React.useEffect(() => {
      if (talent.employeeStatus) {
         setValue('employeeStatus', talent.employeeStatus);
      }
   }, [talent.employeeStatus, setValue]);

   React.useEffect(() => {
      if (talent.talentAvailability) {
         setValue('talentAvailability', talent.talentAvailability);
      }
   }, [talent.talentAvailability, setValue]);



   React.useEffect(() => {
      if (talent.position) {
         const arrPosisi = talent.position.map(pos => pos.positionId);
         setPosisi(arrPosisi);
         setValue('position', arrPosisi);
      }
   }, [talent.position])


   React.useEffect(() => {
      if (talent.skillSet) {
         const arrSkillSet = talent.skillSet.map(pos => pos.skillsetId);
         setSkill(arrSkillSet);
         setValue('skillSet', arrSkillSet);
      }
   }, [talent.skillSet])


   React.useEffect(() => {
      if (talent.dob) {

         const tgl = getDateSubstring(talent.dob)
         const newTgl = convertDateFromDash(tgl)

         setDob(newTgl)

         setValue('dob', tgl);
      }
   }, [talent.dob])







   return (


      <Box sx={{ width: '100%', height: '100%' }}>


         <Box sx={{ width: '100%', padding: '20px 0 20px 0', fontSize: '1rem', fontWeight: '500', color: theme.palette.dark_1.main }}>
            <Button onClick={() => setInnerContent('talent')} variant="text" startIcon={<KeyboardBackspaceRoundedIcon />} sx={{ color: theme.palette.primary.main }}>Kembali</Button>
         </Box>



         <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '9px',
            boxShadow: '1px 14px 21px -15px rgba(0,0,0,0.30)'
            , border: `1px solid ${theme.palette.border_1.main}`
         }}>

            {/* title */}
            <Box sx={{ padding: '10px 20px', width: '100%' }}>Edit Talent</Box>



            <Box sx={{ padding: '10px 20px', width: '100%' }}>



               {/* ----------------------------------------------
                     FORM INPUT DATA
                --------------------------------------------- */}

               <form onSubmit={handleSubmit(onSubmit)}>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '.9rem', color: theme.palette.dark_1.main, margin: '10px 0' }}>




                     <Box
                        sx={{
                           display: "flex",
                           flexDirection: "column",
                           fontSize: ".9rem",
                           color: theme.palette.dark_1.main,
                           width: "fit-content",
                        }}
                     >
                        Foto Talent

                        {talent.talentPhotoUrl ?
                           <img
                              src={talent.talentPhotoUrl}
                              alt="Foto Talent"
                              style={{ width: "60px", height: "60px", objectFit: "cover", marginBottom: "10px", cursor: "pointer", borderRadius: '15px' }}
                              onClick={() => document.getElementById('photoFileInput').click()}
                           />
                           :
                           <Button
                              color="primary"
                              component="span"
                              onClick={() => document.getElementById('photoFileInput').click()}

                              sx={{
                                 border: `2px dashed ${theme.palette.primary.main}`,
                                 height: '60px',
                                 width: '60px',
                                 minWidth: '60px',
                                 borderRadius: '15px'
                              }}
                           >
                              <InsertPhotoIcon sx={{ fontSize: '3rem' }} />
                           </Button>

                        }


                        <input
                           id="photoFileInput"
                           style={{
                              display: "none",

                           }}
                           type="file"

                           onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                 setPhotoFile(file)
                                 const reader = new FileReader();
                                 reader.onloadend = () => {
                                    setTalent({ ...talent, talentPhotoUrl: reader.result });
                                 };
                                 reader.readAsDataURL(file);
                              }
                           }}
                        />

                        {/* {errors.photoFile && (
                           <Typography sx={{ color: "red", fontSize: ".8rem" }}>
                              {errors.photoFile.message}
                           </Typography>
                        )} */}
                     </Box>







                     <Box>
                        <Typography sx={{ fontSize: '.85rem' }}>Nama Talent</Typography>
                        <Controller
                           name="talentName"
                           control={control}
                           defaultValue={talent.talentName || ""}
                           rules={{ required: 'nama tidak boleh kosong' }}
                           render={({ field }) => (
                              <>
                                 <TextField
                                    {...field}
                                    id="outlined-size-small"
                                    size="small"
                                    sx={style({ theme })}
                                    error={!!errors.talentName}
                                    onChange={(e) => {
                                       field.onChange(e);
                                       setTalent({ ...talent, talentName: e.target.value });
                                    }}
                                 />
                                 <ErrorMessage fieldName="talentName" errors={errors} theme={theme} />
                              </>
                           )}
                        />
                     </Box>


                     <Box>
                        <Typography sx={{ fontSize: '.85rem' }}>Nomor Induk Pegawai</Typography>
                        <Controller
                           name="nip"
                           control={control}
                           defaultValue={talent.nip || ''}
                           rules={{ required: 'Nomor Induk Pegawai tidak boleh kosong' }}
                           render={({ field }) => (
                              <>
                                 <TextField
                                    {...field}
                                    id="outlined-size-small"
                                    size="small"
                                    sx={style({ theme })}
                                    error={!!errors.nip}
                                    onChange={(e) => {
                                       field.onChange(e);
                                       setTalent({ ...talent, nip: e.target.value });
                                    }}
                                 />
                                 <ErrorMessage fieldName="nip" errors={errors} theme={theme} />
                              </>
                           )}
                        />
                     </Box>




                     <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>

                        <FormControl sx={{ width: '50%' }}>
                           <Typography sx={{ fontSize: '.85rem' }}>Jenis Kelamin</Typography>
                           <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              value={talent.sex || ''}
                              onChange={(e) => setTalent({ ...talent, sex: e.target.value })}

                           >
                              <FormControlLabel value="L" control={<Radio />} label="Laki-laki" />
                              <FormControlLabel value="P" control={<Radio />} label="Perempan" />

                           </RadioGroup>
                        </FormControl>


                        <Box sx={{ width: '50%' }}>
                           <Typography sx={{ fontSize: '.85rem' }}>Tanggal Lahir</Typography>
                           <DatePickerCustom
                              value={dob}
                              onChange={handleTglRequest}

                              inputProps={{ ...register("dob", { required: "Tanggal Lahir wajib diisi" }) }}
                              error={!!errors.dob}

                           />
                           <ErrorMessage fieldName="dob" errors={errors} theme={theme} />
                        </Box>
                     </Box>






                     <Box>
                        <Typography sx={{ fontSize: ".85rem" }}>Deskripsi Talent</Typography>
                        <Controller
                           name="talentDescription"
                           control={control}
                           defaultValue={talent.talentDescription || ""}
                           rules={{ required: 'Deskripsi Talent tidak boleh kosong' }}
                           render={({ field }) => (
                              <>
                                 <TextField
                                    {...field}
                                    multiline
                                    rows={2} // Jumlah baris yang ditampilkan pada awalnya
                                    variant="outlined"
                                    placeholder="Tulis Deskripsi Talent"
                                    sx={{
                                       padding: "0px",
                                       width: "100%", // Memastikan lebar 100% dari kontainer induk
                                       "& .MuiOutlinedInput-root": {
                                          borderRadius: "7px", // Radius border untuk tampilan lebih baik
                                          padding: "10px",
                                          fontSize: ".9rem",
                                          '& fieldset': {
                                             borderColor: theme.palette.border_1.main,
                                          }
                                       },
                                       "& textarea": {
                                          resize: "vertical", // Memungkinkan perubahan ukuran vertikal
                                       },
                                    }}
                                    error={!!errors.talentDescription}
                                    onChange={(e) => {
                                       field.onChange(e);
                                       setTalent({ ...talent, talentDescription: e.target.value });
                                    }}
                                 />
                                 <ErrorMessage fieldName="talentDescription" errors={errors} theme={theme} />
                              </>
                           )}
                        />
                     </Box>






                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           fontSize: '.9rem',
                           color: theme.palette.dark_1.main,
                           width: 'fit-content',
                        }}
                     >
                        pilih file cv

                        <Button
                           color="primary"
                           component="span"
                           onClick={() => document.getElementById('cvFileInput').click()}
                           sx={{
                              border: `2px dashed ${theme.palette.primary.main}`,
                              height: '60px',
                              width: '60px',
                              minWidth: '60px',
                              borderRadius: '15px'
                           }}
                        >
                           <ArticleRoundedIcon sx={{ fontSize: '3rem' }} />


                        </Button>

                        {cvFileName && (
                           <Typography
                              onClick={() => document.getElementById('cvFileInput').click()}
                              sx={{ cursor: 'pointer', color: theme.palette.primary.main, marginTop: '10px' }}
                           >
                              {cvFileName}
                           </Typography>
                        )}

                        <input
                           id="cvFileInput"
                           style={{
                              display: 'none', // Menyembunyikan input file
                           }}
                           type="file"
                           {...register('cvFile')}
                           onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                 setCvFile(file)
                                 setCvFileName(file.name); // Menyimpan nama file yang diunggah
                              }
                           }}
                        />
                     </Box>






                     <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'end' }}>


                        <Box sx={{ width: '50%' }}>
                           <Typography sx={{ fontSize: '.85rem' }}>Pengalaman</Typography>
                           <Controller
                              name="talentExperience"
                              control={control}
                              defaultValue={talent.talentExperience || ""}
                              rules={{ required: 'Pengalaman tidak boleh kosong' }}
                              render={({ field }) => (
                                 <>
                                    <TextField
                                       {...field}
                                       id="outlined-size-small"
                                       size="small"
                                       sx={style({ theme })}
                                       error={!!errors.talentExperience}
                                       onChange={(e) => {
                                          field.onChange(e);
                                          setTalent({ ...talent, talentExperience: e.target.value });
                                       }}
                                    />
                                    <ErrorMessage fieldName="talentExperience" errors={errors} theme={theme} />
                                 </>
                              )}
                           />
                        </Box>

                        <Box sx={{ width: '50%' }}>
                           <Controller
                              name="talentLevel"
                              control={control}
                              // rules={{ required: 'Level wajib diisi' }}
                              render={({ field }) => (
                                 <>
                                    <SelectCustom
                                       index={0}
                                       filter={{
                                          id: "filter-level",
                                          label: "Level",
                                          options: filterOptions,
                                          age: cekLevel(field.value),
                                          handleChange: (e) => {
                                             field.onChange(e);
                                             setTalent({ ...talent, talentLevel: e.target.value });
                                          },
                                       }}
                                       width='100%'
                                    // error={!!errors.talentLevel}
                                    />
                                    {/* <ErrorMessage fieldName="talentLevel" errors={errors} theme={theme} /> */}
                                 </>
                              )}
                           />
                        </Box>

                     </Box>




                     <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '.85rem' }}>Position</Typography>
                        <MultipleSelect
                           data={positions}
                           label="First Select"
                           idKey="positionId"
                           nameKey="positionName"
                           selectedValue={posisi}
                           onChange={setPosisi}

                           inputProps={{ ...register("position", { required: "position wajib diisi" }) }}
                           error={!!errors.position}
                        />
                        <ErrorMessage fieldName="position" errors={errors} theme={theme} />
                     </Box>


                     <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '.85rem' }}>Skillset</Typography>
                        <MultipleSelect
                           data={skillsets}
                           label="Second Select"
                           idKey="skillsetId"
                           nameKey="skillName"
                           selectedValue={skill}
                           onChange={setSkill}

                           inputProps={{ ...register("skillSet", { required: "skillsets wajib diisi" }) }}
                           error={!!errors.skillSet}
                        />

                        <ErrorMessage fieldName="skillSet" errors={errors} theme={theme} />
                     </Box>









                     <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '.85rem' }}>Email</Typography>
                        <Controller
                           name="email"
                           control={control}
                           defaultValue={talent.email || ""}
                           rules={{
                              required: 'Email tidak boleh kosong', // Aturan validasi: wajib diisi
                              pattern: {
                                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Aturan validasi: format email
                                 message: 'Format email tidak valid' // Pesan kesalahan untuk format email yang salah
                              }
                           }}
                           render={({ field }) => (
                              <>
                                 <TextField
                                    {...field}
                                    id="outlined-size-small"
                                    size="small"
                                    sx={style({ theme })}
                                    error={!!errors.email} // Menampilkan kesalahan jika ada
                                    onChange={(e) => {
                                       field.onChange(e); // Memperbarui nilai di react-hook-form
                                       setTalent({ ...talent, email: e.target.value }); // Memperbarui state lokal
                                    }}
                                 />
                                 <ErrorMessage fieldName="email" errors={errors} theme={theme} />
                              </>
                           )}
                        />
                     </Box>


                     <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '.85rem' }}>No. HP</Typography>
                        <Controller
                           name="cellphone"
                           control={control}
                           defaultValue={talent.cellphone || ""}
                           rules={{
                              required: 'No. HP tidak boleh kosong', // Aturan validasi: wajib diisi
                              pattern: {
                                 value: /^[0-9]{10,13}$/, // Aturan validasi: hanya angka dengan panjang 10 hingga 15 digit
                                 message: 'No. HP harus berupa angka dan panjang antara 10 hingga 13 digit' // Pesan kesalahan untuk format nomor HP yang salah
                              }
                           }}
                           render={({ field }) => (
                              <>
                                 <TextField
                                    {...field}
                                    id="outlined-size-small"
                                    size="small"
                                    // type="number"
                                    sx={style({ theme })}
                                    error={!!errors.cellphone} // Menampilkan kesalahan jika ada
                                    onChange={(e) => {
                                       field.onChange(e); // Memperbarui nilai di react-hook-form
                                       setTalent({ ...talent, cellphone: e.target.value }); // Memperbarui state lokal
                                    }}
                                 />
                                 <ErrorMessage fieldName="cellphone" errors={errors} theme={theme} />
                              </>
                           )}
                        />
                     </Box>


                     <Box sx={{ width: '50%' }}>
                        <Controller
                           name="employeeStatus"
                           control={control}
                           // rules={{ required: 'employee Status wajib diisi' }}
                           render={({ field }) => (
                              <>
                                 <SelectCustom
                                    index={0}
                                    filter={{
                                       id: "filter-employee-status",
                                       label: "Employee Status",
                                       options: filterKepegawaian,
                                       age: cekEmpStatus(talent.employeeStatus || ''),
                                       handleChange: (e) => {
                                          field.onChange(e);
                                          setTalent({ ...talent, employeeStatus: e.target.value });
                                       },
                                    }}
                                    width='100%'
                                 // error={!!errors.employeeStatus}
                                 />
                                 {/* <ErrorMessage fieldName="employeeStatus" errors={errors} theme={theme} /> */}
                              </>
                           )}
                        />
                     </Box>


                     <Box sx={{ width: '50%' }}>
                        <Controller
                           name="talentAvailability"
                           control={control}
                           // rules={{
                           //    validate: (value) => value !== "" || 'talentAvailability Status wajib diisi'
                           // }}
                           render={({ field }) => (
                              <>
                                 <SelectCustom
                                    index={0}
                                    filter={{
                                       id: "filter-available",
                                       label: "Ketersediaan Talent",
                                       options: talentEvailability,
                                       age: cekAvail(talent.talentAvailability || ""),
                                       handleChange: (e) => {
                                          field.onChange(e);
                                          setTalent({ ...talent, talentAvailability: e.target.value });
                                       },
                                    }}
                                    width='100%'
                                 // error={!!errors.talentAvailability}
                                 />
                                 {/* <ErrorMessage fieldName="talentAvailability" errors={errors} theme={theme} /> */}
                              </>
                           )}
                        />
                     </Box>

                     <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '.85rem' }}>Biografi Video URL (Optional) </Typography>
                        <TextField

                           id="outlined-size-small"
                           size="small"
                           value={talent.videoUrl || ''}
                           onChange={(e) => setTalent({ ...talent, videoUrl: e.target.value })}
                           sx={style({ theme })}
                        />
                     </Box>


                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end', gap: '10px', width: 'fit-content', width: '100%', padding: '20px' }}>

                     <Button onClick={() => handleReset()} variant="text">Batal</Button>
                     {/* <Button type="submit" variant="contained">Submit</Button> */}

                     <LoadingButton
                        onClick={handleSubmit(onSubmit)}  // Integrate with react-hook-form's handleSubmit
                        loading={loading}
                        variant="contained"
                        type="submit"
                     >
                        Submit
                     </LoadingButton>
                  </Box>
               </form>
            </Box>
         </Box>

      </Box>
   );
};

export default ContentAddTalent;



// const ContentAddTalent =()=>{
//    return <>contetn edit</>
// }

// export default ContentAddTalent

