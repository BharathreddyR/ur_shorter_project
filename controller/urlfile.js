const express =require('express')
const router =express.Router()
const mongoose = require('mongoose')
const urlModel = require('../model/urlmodel')
const shortid = require('shortid')
const validate =require('../validations')
const { url } = require('inspector')
const { Console } = require('console')

router.post('/data',async(req,res)=>{
    try {
        const baseUrl = 'http://localhost:4007'
        let { longUrl } = req.body

        if (!validate.isValid(longUrl)) {
            res.send({ message: "longUrl is required " })
            return
        }
        let checkUrl =longUrl.trim()
        console.log(checkUrl)
        if (validate.validhttpsLower(checkUrl)) {
            const regex = /^https?:\/\//
            checkUrl = checkUrl.replace(regex, "http://")

        }

        if (validate.validhttpsUpper(checkUrl)) {
            const regex = /^HTTPS?:\/\//
            checkUrl = checkUrl.replace(regex, "http://")

        }
        if(!validate.validateUrl(checkUrl)){
            res.status.send({status:false,message:'long url id  not valid'})
            return
        }
        
        let findUrl = await urlModel.findOne({ longUrl: checkUrl })
       // console.log(findUrl)
        if (findUrl) {
         res.send({  message: "ShortUrl already generated in DB", data: findUrl})
         return
        }


        const urlCode = shortid.generate().toLowerCase()

        shortUrl = baseUrl + '/' + urlCode
        console.log(shortUrl)
        url ={
            urlCode:urlCode,
            longUrl:checkUrl,
            shortUrl:shortUrl

        }
        const urlData =await urlModel.create(url)
        //console.log(urlData)
        res.send({  data: urlData })
        return

    } catch (err) {
        res.send({  message:err.message })
    }
})

router.get('/:urlCodeid',async(req,res)=>{
    try{
        const urlCode = req.params.urlCodeid
        if (urlCode.length === 0) {          
            res.status(400).send({ status: false, message: "No UrlCode found " })
            return
        }    
        const url = await urlModel.findOne({ urlCode: urlCode })
        console.log(url)
        if (!url) {
            return res.send({message: "No Url Found" })
        }else{
            let oldUrl = url.longUrl
            return res.status(302).redirect(oldUrl)
        }
    }catch(err){
        res.status.send({status:false,message:err.message})
        return
    }
})


module.exports = router
