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
            const { data } = res
            return {
                id: data.ip,
                city: data.city,
                region: data.region,
                country: data.country,
                lat: data.latitude,
                lng: data.longitude,
                regionCode: data.region_code,
                countryCode: data.country_code
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