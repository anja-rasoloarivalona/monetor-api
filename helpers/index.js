import axios from 'axios'
import requestIp from 'request-ip'

const getFileExtention = (fileName) => {
    const [, extension] = fileName.split('.');

    return extension;
}

const getIpDetails = async req => {
    try {
        const ipAddress =  requestIp.getClientIp(req)
        const res = await axios.get(`https://ipapi.co/${ipAddress}/json`)
        console.log({
            ipDetails: res
        })
        if(res){
            return {
                id: res.ip,
                city: res.city,
                region: res.region,
                country: res.country,
                lat: res.latitude,
                lng: res.longitude,
                regionCode: res.region_code,
                countryCode: res.country_code
            }
        }
        return null
    } catch(err){
        console.log({ err })
        return null
    }
}

export {
    getFileExtention,
    getIpDetails
}