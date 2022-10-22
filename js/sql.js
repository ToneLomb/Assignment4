const knex = require('knex')({
  client:'pg',
  connection:{
      host:'localhost',
      database:'postgres',
      user: 'postgres',
      password: 'sieu-eng',
  }
});

const getClubByFirstname = async (name) =>{
  try{
    console.log('Je suis la')
    const results = await knex('students').join('clubs','clubs.clubid','=','students.clubid').where({firstname: name}).select('clubs.name');
    console.log(results);
    if(Object.keys(results).length != 0){
      respObj = {
            status: "success",
            data : results
      }
      return(respObj)
    }else{
      throw new Error("student is not in the database")
    }
  }catch(e){
      respObj = {
        status: "failed",
        data : 'Student is not in the database, try again'
      } 
      return respObj
    }
  }
    

const selectClubID = async (name) =>{
    
    const results = await knex('clubs').where({name: name}).select('clubid', 'name', 'sport', 'schoolid')
    return results;
}

const createClub = async (name,sport) => {
  try{
    const create = await knex('clubs').insert({name: name, sport: sport, schoolid: 2}).returning('*');
    console.log(create)
    respObj = {
      status: "success",
      data: create
    }
    return respObj
  }catch(e){
    console.log(e)
    respObj = {
      status: "failed",
      data: "A club with this name already exists"
    }
    return respObj
  }
    
}

const updateStudent = async (ID,firstname,lastname,age,school)  =>{
    try{
      const query = await knex('students').where('studentid','=',ID).update({firstname: firstname, lastname: lastname, age: age, schoolid: school})
      if(query === 0){
        throw new Error("StudentID doesn't exist")
      }
      return {success: "true"}
    }catch(e){
      return{success: "false", reason: "Student or school ID doesn't exist, try again"}
    }
}

const deleteClub = async (ID) => {
    try{
      const query = await knex('clubs').where('clubid','=',ID).del()
      if(query ===0){
        throw new Error("Club ID doesn't exist")
      }
      return {success: "true"}
    }catch(e){
      return{success: "false", reason: "Club ID doesn't exist, try again"}
    }
}

exports.deleteClub = deleteClub;
exports.updateStudent = updateStudent;
exports.createClub = createClub;
exports.selectClubID = selectClubID
exports.getClubByFirstname = getClubByFirstname;