import stockimage0 from '../assets/stockimages/stock-image-0.jpg'
import stockimage1 from '../assets/stockimages/stock-image-1.jpg'
import stockimage2 from '../assets/stockimages/stock-image-2.jpg'
import stockimage3 from '../assets/stockimages/stock-image-3.jpg'
import stockimage4 from '../assets/stockimages/stock-image-4.jpg'
import stockimage5 from '../assets/stockimages/stock-image-5.jpg'
import stockimage6 from '../assets/stockimages/stock-image-6.jpg'

const ImageHandler = () => {

    const mapImg = () => {
        const randint = Math.floor(Math.random() * 7)
        switch (randint) {
            case 0: 
                return stockimage0
            case 1: 
                return stockimage1
            case 2: 
                return stockimage2
            case 3: 
                return stockimage3
            case 4: 
                return stockimage4
            case 5: 
                return stockimage5
            default: 
                return stockimage6
            
        }
    } 

    return ( 
        <img style={{height: 300, objectFit: "cover"}} src={mapImg()} alt="placeholder" />
     );
}
 
export default ImageHandler;