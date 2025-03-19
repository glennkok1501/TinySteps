import stockimage0 from '../../assets/stockimages/stock-image-0.jpg'
import stockimage1 from '../../assets/stockimages/stock-image-1.jpg'
import stockimage2 from '../../assets/stockimages/stock-image-2.jpg'
import stockimage3 from '../../assets/stockimages/stock-image-3.jpg'
import stockimage4 from '../../assets/stockimages/stock-image-4.jpg'
import stockimage5 from '../../assets/stockimages/stock-image-5.jpg'
import stockimage6 from '../../assets/stockimages/stock-image-6.jpg'
import stockimage7 from '../../assets/stockimages/stock-image-7.jpg'
import stockimage8 from '../../assets/stockimages/stock-image-8.jpg'
import stockimage9 from '../../assets/stockimages/stock-image-9.jpg'
import stockimage10 from '../../assets/stockimages/stock-image-10.jpg'


const ImageHandler = ({height, index}) => {
    const images = [
        stockimage0,
        stockimage1,
        stockimage2,
        stockimage3,
        stockimage4,
        stockimage5,
        stockimage6,
        stockimage7,
        stockimage8,
        stockimage9,
        stockimage10,

    ]

    return ( 
        <img style={{width: "100%", height: height, borderRadius: 15, objectFit: "cover"}} src={images[index]} alt="placeholder" />
     );
}
 
export default ImageHandler;