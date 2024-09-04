
import React, { useState } from 'react';
import { Box, TextField, Button, useTheme, IconButton, styled, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, OutlinedInput, MenuItem, Chip, FormHelperText } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { postTalent } from '../services/apis';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SelectCustom from './SelectCutom';
import DatePickerCustom from './DatePickerCustom';
import MultipleSelect from './MultipleSelect';
import toast from 'react-hot-toast';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import { useInner } from '../context/InnerContentProvider';


// STYLE
const back_button = ({ theme }) => ({
   width: '100%', padding: '20px 0 20px 0', fontSize: '1rem', fontWeight: '500', color: theme.palette.dark_1.main
})

const content_container = ({ theme }) => ({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   backgroundColor: theme.palette.background.paper,
   borderRadius: '9px',
   boxShadow: '1px 14px 21px -15px rgba(0,0,0,0.30)',
   border: `1px solid ${theme.palette.border_1.main}`
})

const inner_form = ({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   fontSize: '.9rem',
   color: theme.palette.dark_1.main,
   margin: '10px 0'
})

const foto_talent_btn = ({ theme, hasPhotoError, hasCvError }) => ({

   border: hasPhotoError || hasCvError ? `2px dashed ${theme.palette.error.main}` : `2px dashed ${theme.palette.primary.main}`,
   height: '60px',
   width: '60px',
   minWidth: '60px',
   borderRadius: '15px'

})

const foto_talent_img = {
   width: '60px',
   height: '60px',
   objectFit: 'cover',
   cursor: 'pointer',
   borderRadius: '15px',
   overflow: 'hidden'
}

const text_area_sty = {
   padding: "0px",
   width: "100%",
   "& .MuiOutlinedInput-root": {
      borderRadius: "7px",
      padding: "10px",
      fontSize: ".9rem",
   },
   "& textarea": {
      resize: "vertical",
   },
}


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
      paddingLeft: '6px'
   },
   '& .MuiInputBase-input': {
      height: '14px',
      padding: '10px',
   },
})



// DATA

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

const filterOptions = [
   { value: "", label: "None" },
   { value: "e0c3c066-2ac2-40bf-971b-2de2c9003be6", label: "Junior" },
   { value: "64d5512c-bd45-4211-97e0-2b069b264d05", label: "Middle" },
   { value: "22848659-c9e8-4df4-bd86-24c215442db3", label: "Senior" },
];

const filterKepegawaian = [
   { value: "", label: "None" },
   { value: "82dacb82-f0d6-4a09-9acb-ad67a2d9809e", label: "Active" },
   { value: "7d39f674-dd1e-4f6d-8436-11e1a162734b", label: "Non Active" }
];
const talentEvailability = [
   { value: "", label: "None" },
   { value: 'avail', label: "Available" },
   { value: 'not_avail', label: "Non Available" }
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

   const theme = useTheme()
   const { setInnerContent } = useInner()

   const [talent, setTalent] = React.useState({
      dob: ''
   });

   const { register, handleSubmit, control, setError, clearErrors, reset, setValue, watch, formState: { errors } } = useForm(
      {
         defaultValues: {
            sex: '' // Default value for the radio button
         }
      }
   );

   const onSubmit = async (data) => {
      try {
         const formattedPositions = posisi.map(id => ({ positionId: id }));
         const formattedSkillsets = skill.map(id => ({ skillsetId: id }));

         const result = {
            talentName: data.talentName,
            talentStatus: "feee9f36-a978-455d-b324-9d360421d068",
            nip: data.nip,
            sex: data.sex,
            dob: convertDateFromSlash(dob),
            talentDescription: data.talentDescription,
            employeeStatus: employeeStatus,
            talentAvailability: cekAvail(available),
            talentExperience: 10,
            talentLevel: talentLevel,
            email: data.email,
            positions: formattedPositions,
            skillsets: formattedSkillsets,
            cellphone: data.cellphone,
         };


         await postTalent(result, photoFile, cvFile);
         toast.success('Berhasil tambah data ')
         handleReset()
         console.log("Talent data successfully saved!", result);

      } catch (error) {

         let errorMessage = 'Gagal tambah data';


         if (error.response) {

            console.log('yaaaaaa')
            console.log(error.response.data.errors[0].meta.errorSources);
            errorMessage = String(Object.values(error.response.data.errors[0].meta.errorSources))




         }

         toast.error(errorMessage)
      }
   };





   const [talentLevel, setTalentLevel] = React.useState('');
   const handleTalentLevel = React.useCallback((event) => {
      setTalentLevel(event.target.value);
   }, []);



   const [employeeStatus, setEmployeeStatus] = React.useState('');
   const handleEmployeeStatus = React.useCallback((event) => {
      setEmployeeStatus(event.target.value);
   }, []);


   const [available, setAvailable] = React.useState('');
   const handleAvailable = React.useCallback((event) => {
      setAvailable(event.target.value);
   }, []);



   const handleReset = () => {
      reset()
      setTalentLevel('')
      setEmployeeStatus('')
      setAvailable('')
      setPosisi([])
      setSkill([])
      setPhotoUrl('')
      setCvFileName('')
   }

   const cekAvail = (avail) => {
      if (avail == 'avail') {
         return true
      } else {
         return false
      }
   }


   const [posisi, setPosisi] = React.useState([]);
   const [skill, setSkill] = React.useState([]);

   const [photoFile, setPhotoFile] = React.useState(null);
   const [cvFile, setCvFile] = React.useState(null);
   const hasPhotoError = !!errors.photoFile;

   const [photoUrl, setPhotoUrl] = React.useState('');
   const [cvFileName, setCvFileName] = React.useState('');
   const hasCvError = !!errors.cvFile;

   const [dob, setDob] = useState('')

   const [sex, setSex] = useState('P')

   React.useEffect(() => {
      console.log(sex)
   }, [sex])




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



   const validatePastDate = (date) => {
      const today = new Date();
      const selectedDate = new Date(date);
      return selectedDate < today || 'Tanggal Lahir harus dari masa lalu';
   };



   return (


      <Box sx={{ width: '100%', height: '100%' }}>

         <Box sx={back_button({ theme })}>
            <Button
               onClick={() => setInnerContent('talent')}
               variant="text"
               startIcon={<KeyboardBackspaceRoundedIcon />}
               sx={{ color: theme.palette.primary.main }}>
               Kembali
            </Button>
         </Box>


         {/* CONTETNT */}
         <Box sx={content_container({ theme })}>

            {/* title */}
            <Box sx={{ padding: '10px 20px', width: '100%', color: theme.palette.text.white }}>Tambah Talent</Box>
            <Box sx={{ padding: '10px 20px', width: '100%' }}>

               {/* ----------------------------------------------
                     FORM INPUT DATA
                --------------------------------------------- */}

               <form onSubmit={handleSubmit(onSubmit)}>

                  <Box sx={inner_form({ theme })}>



                     {/* --> foto */}
                     <Box sx={{ display: 'flex', flexDirection: 'column', fontSize: '.9rem', color: theme.palette.dark_1.main, width: 'fit-content', }}>
                        Foto Talent

                        {!photoUrl ? (
                           <Button
                              color="primary"
                              component="span"
                              onClick={() => document.getElementById('photoFileInput').click()}
                              sx={foto_talent_btn({ theme, hasPhotoError })}
                           >
                              <InsertPhotoIcon sx={{ fontSize: '3rem' }} />
                           </Button>
                        ) : (
                           <img
                              src={photoUrl}
                              alt="Foto Talent"
                              style={foto_talent_img}
                              onClick={() => document.getElementById('photoFileInput').click()}
                           />
                        )}

                        <input
                           id="photoFileInput"
                           style={{ display: 'none' }}
                           type="file"
                           {...register('photoFile', { required: 'Kolom foto tidak boleh kosong', })}


                           onChange={(e) => {
                              const file = e.target.files[0];

                              if (file) {
                                 //-- validasi format
                                 const validFormats = ['image/jpeg', 'image/png', 'image/svg+xml'];
                                 if (!validFormats.includes(file.type)) {
                                    setError('photoFile', {
                                       type: 'manual',
                                       message: 'Format file harus berupa .jpg/.jpeg/.png',
                                    });
                                    return;
                                 }

                                 // validasi size (max 2MB)
                                 const maxSizeInBytes = 2 * 1024 * 1024;
                                 if (file.size > maxSizeInBytes) {
                                    setError('photoFile', {
                                       type: 'manual',
                                       message: 'Ukuran foto maksimal 2MB',
                                    });
                                    return;
                                 }


                                 setPhotoFile(file);
                                 const reader = new FileReader();
                                 reader.onloadend = () => {
                                    setPhotoUrl(reader.result);
                                 };
                                 reader.readAsDataURL(file);
                                 clearErrors('photoFile');
                              }
                           }}
                        />

                        <ErrorMessage fieldName="photoFile" errors={errors} theme={theme} />

                     </Box>




                     {/* talent name */}
                     <Box>
                        <Typography sx={{ fontSize: ".85rem" }}>Nama Talent</Typography>
                        <TextField
                           id="outlined-size-small"
                           size="small"
                           // {...register("talentName", { required: "Nama talent wajib diisi" })}
                           {...register("talentName", {
                              required: "Nama talent wajib diisi",
                              minLength: {
                                 value: 1,
                                 message: "Nama talent harus memiliki minimal 1 karakter"
                              },
                              maxLength: {
                                 value: 10,
                                 message: "Nama talent tidak boleh lebih dari 10 karakter"
                              }
                           })}
                           error={!!errors.talentName}
                           sx={style({ theme })}

                        />
                        <ErrorMessage fieldName="talentName" errors={errors} theme={theme} />
                     </Box>


                     {/* nip */}

                     <Box>
                        <Typography sx={{ fontSize: ".85rem" }}>Nomor Induk Pegawai</Typography>
                        <TextField
                           id="outlined-size-small"
                           size="small"
                           type='number'
                           {...register("nip", {
                              required: "Nomor Induk Pegawai wajib diisi",

                              minLength: {
                                 value: 10,
                                 message: "Nip max 10 karakter"
                              },
                              maxLength: {
                                 value: 10,
                                 message: "Nip max 10 karakter"
                              },

                              pattern: {
                                 value: /^\d+$/,
                                 message: "Hanya angka yang diperbolehkan dan tidak boleh desimal"
                              }


                           })}
                           error={!!errors.nip}

                           sx={style({ theme })}
                        />

                        <ErrorMessage fieldName="nip" errors={errors} theme={theme} />

                     </Box>



                     {/* sex */}
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>

                        <FormControl sx={{ width: '50%' }}>
                           <Typography sx={{ fontSize: '.85rem' }}>Jenis Kelamin</Typography>
                           <Controller
                              name="sex"
                              control={control}
                              defaultValue="L" // Default value
                              rules={{ required: "Jenis Kelamin wajib diisi" }} // Validation rule
                              render={({ field }) => (
                                 <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    value={field.value}
                                    onChange={(event) => field.onChange(event.target.value)}
                                 >
                                    <FormControlLabel value="P" control={<Radio />} label="Perempuan" />
                                    <FormControlLabel value="L" control={<Radio />} label="Laki-laki" />
                                 </RadioGroup>
                              )}
                           />
                           <ErrorMessage fieldName="sex" errors={errors} theme={theme} />
                        </FormControl>


                        {/* tanggal lahir */}
                        <Box sx={{ width: '50%' }}>
                           <Typography sx={{ fontSize: '.85rem' }}>Tanggal Lahir</Typography>
                           <DatePickerCustom
                              value={dob}
                              onChange={handleTglRequest}
                              inputProps={{
                                 ...register("dob",
                                    {
                                       required: "Tanggal Lahir wajib diisi",
                                       validate: validatePastDate
                                    })
                              }}
                              error={!!errors.dob}

                           />

                           <ErrorMessage fieldName="dob" errors={errors} theme={theme} />


                        </Box>

                     </Box>


                     {/* description */}
                     <Box>
                        <Typography sx={{ fontSize: ".85rem" }}>Deskripsi Talent</Typography>
                        <TextField
                           name="outlined"
                           multiline
                           rows={2}
                           variant="outlined"
                           placeholder="Tulis Deskripsi Talent"
                           sx={text_area_sty}
                           {...register("talentDescription",
                              {
                                 required: "Deskripsi Talent wajib diisi",

                                 maxLength: {
                                    value: 10,
                                    message: "Deskripsi Talent tidak boleh lebih dari 200 karakter",
                                 },


                              })}
                           error={!!errors.talentDescription}
                        />

                        <ErrorMessage fieldName="talentDescription" errors={errors} theme={theme} />
                     </Box>



                     {/* cv file */}
                     <Box sx={{ display: 'flex', flexDirection: 'column', fontSize: '.9rem', color: theme.palette.dark_1.main, width: 'fit-content' }}>

                        pilih file cv

                        <Button
                           color="primary"
                           component="span"
                           onClick={() => document.getElementById('cvFileInput').click()}
                           sx={foto_talent_btn({ theme, hasCvError })}
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
                           style={{ display: 'none', }}
                           type="file"
                           {...register('cvFile', { required: 'File cv wajib diunggah', })}

                           onChange={(e) => {
                              const file = e.target.files[0];

                              // if (file) {
                              //    setCvFile(file)
                              //    setCvFileName(file.name);
                              //    clearErrors('cvFile');

                              // }

                              if (file) {
                                 // Validasi format file
                                 const validFormats = [
                                    'application/msword', // .doc
                                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
                                    'application/vnd.ms-excel', // .xls
                                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
                                    'application/pdf', // .pdf
                                 ];
                                 if (!validFormats.includes(file.type)) {
                                    setError('cvFile', {
                                       type: 'manual',
                                       message: 'Format file tidak didukung. Gunakan format DOC, DOCX, XLS, XLSX, atau PDF.',
                                    });
                                    return;
                                 }

                                 // Validasi ukuran file (misalnya, maksimal 5MB)
                                 const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
                                 if (file.size > maxSizeInBytes) {
                                    setError('cvFile', {
                                       type: 'manual',
                                       message: 'Ukuran file terlalu besar. Maksimal 5MB.',
                                    });
                                    return;
                                 }

                                 // Jika validasi lolos, proses file
                                 setCvFile(file);
                                 setCvFileName(file.name);
                                 clearErrors('cvFile');
                              }


                           }}
                        />

                        <ErrorMessage fieldName="cvFile" errors={errors} theme={theme} />

                     </Box>


                     {/* experience */}
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'end' }}>

                        <Box sx={{ width: '50%' }}>
                           <Typography sx={{ fontSize: '.85rem' }}>Pengalaman</Typography>
                           <TextField
                              id="outlined-size-small"
                              size="small"
                              sx={style({ theme })}
                              type='number'

                              {...register("talentExperience", {
                                 required: "talentExperience wajib diisi",

                                 pattern: {
                                    value: /^\d+$/,
                                    message: "Hanya angka yang diperbolehkan dan tidak boleh desimal"
                                 }

                              })}
                              error={!!errors.talentExperience}

                           />
                           <ErrorMessage fieldName="talentExperience" errors={errors} theme={theme} />
                        </Box>


                        {/* talent level */}
                        <Box sx={{ width: '50%' }}>
                           <SelectCustom
                              index={0}
                              filter={{
                                 id: "filter-level",
                                 label: "Level",
                                 options: filterOptions,
                                 age: talentLevel,
                                 handleChange: handleTalentLevel,
                              }}
                              width='100%'

                              inputProps={{ ...register("talentLevel", { required: "Level wajib diisi" }) }}
                              error={!!errors.talentLevel}

                           />

                           <ErrorMessage fieldName="talentLevel" errors={errors} theme={theme} />
                        </Box>

                     </Box>



                     {/* POSITION */}
                     <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '.85rem' }}>Position</Typography>
                        <MultipleSelect
                           data={positions}
                           label="First Select"
                           idKey="positionId"
                           nameKey="positionName"
                           selectedValue={posisi}
                           onChange={setPosisi}

                           inputProps={{ ...register("positions", { required: "positions wajib diisi" }) }}
                           error={!!errors.positions}

                        />

                        <ErrorMessage fieldName="positions" errors={errors} theme={theme} />
                     </Box>


                     {/* SKILSET */}
                     <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '.85rem' }}>Skillset</Typography>
                        <MultipleSelect
                           data={skillsets}
                           label="Second Select"
                           idKey="skillsetId"
                           nameKey="skillName"
                           selectedValue={skill}
                           onChange={setSkill}

                           inputProps={{ ...register("skillsets", { required: "skillsets wajib diisi" }) }}
                           error={!!errors.skillsets}
                        />

                        <ErrorMessage fieldName="skillsets" errors={errors} theme={theme} />
                     </Box>


                     {/* EMAIL */}


                     <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '.85rem' }}>Email</Typography>
                        <TextField
                           id="outlined-size-small"
                           size="small"
                           {...register("email", {
                              required: "Email wajib diisi", // Validasi email tidak boleh kosong
                              pattern: {
                                 value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, //--> pola regex untuk email
                                 message: "Format email tidak valid", // Pesan error untuk email yang tidak valid
                              },
                           })}

                           error={!!errors.email}
                           sx={style({ theme })}



                        />
                        <ErrorMessage fieldName="email" errors={errors} theme={theme} />

                     </Box>


                     {/* No hape */}

                     <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '.85rem' }}>No. HP</Typography>
                        <TextField
                           id="outlined-size-small"
                           size="small"
                           type='number'
                           {...register("cellphone", {
                              required: "No. HP wajib diisi", // Validasi untuk memastikan field tidak boleh kosong
                              pattern: {
                                 value: /^[0-9]+$/, // Pola regex untuk hanya angka
                                 message: "No. HP hanya boleh berisi angka", // Pesan error jika bukan angka
                              },
                              minLength: {
                                 value: 10, // Minimal panjang karakter
                                 message: "No. HP minimal 10 digit",
                              },
                              maxLength: {
                                 value: 13, // Maksimal panjang karakter
                                 message: "No. HP maksimal 13 digit",
                              },
                           })}
                           sx={style({ theme })}

                           error={!!errors.cellphone}
                        />

                        <ErrorMessage fieldName="cellphone" errors={errors} theme={theme} />
                     </Box>




                     {/* EMPLOYEE STATUS
                     type: select
                     */}
                     <Box sx={{ width: '100%' }}>
                        <SelectCustom
                           index={0}
                           filter={{
                              id: "filter-employee-status",
                              label: "Employee Status",
                              options: filterKepegawaian,
                              age: employeeStatus,
                              handleChange: handleEmployeeStatus,
                           }}
                           width='100%'

                           inputProps={{ ...register("employeeStatus", { required: "employee status wajib diisi" }) }}
                           error={!!errors.employeeStatus}

                        />
                        <ErrorMessage fieldName="employeeStatus" errors={errors} theme={theme} />
                     </Box>






                     <Box sx={{ width: '100%' }}>
                        <SelectCustom
                           index={0}
                           filter={{
                              id: "filter-available",
                              label: "Ketersediaan Talent",
                              options: talentEvailability,
                              age: available,
                              handleChange: handleAvailable,
                           }}
                           width='100%'

                           inputProps={{ ...register("talentEvailable", { required: "talentEvailable status wajib diisi" }) }}
                           error={!!errors.talentEvailable}
                        />

                        <ErrorMessage fieldName="talentEvailable" errors={errors} theme={theme} />
                     </Box>



                     <Box sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '.85rem' }}>Biografi Video URL (Optional) </Typography>
                        <TextField

                           id="outlined-size-small"
                           size="small"

                           sx={style({ theme })}
                        />
                     </Box>


                  </Box>


                  <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end', gap: '10px', width: 'fit-content', width: '100%', padding: '20px' }}>

                     <Button onClick={() => handleReset()} variant="text">Batal</Button>
                     <Button type="submit" variant="contained">Submit</Button>
                  </Box>
               </form>


            </Box>
         </Box >
      </Box >
   );
};

export default ContentAddTalent;



// const ContentAddTalent = () => {

//    return (
//       <>add talent</>
//    )

// }
// export default ContentAddTalent