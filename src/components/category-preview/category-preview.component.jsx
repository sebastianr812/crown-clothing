
import ProductCard from '../product-card/product-card.component';



import { CategoryPreviewContainer, StyledLink, PreviewContainer } from './category-preview.styles.jsx';



const CategoryPreview = ({ title, products }) => {


    return (
        <CategoryPreviewContainer>
            <StyledLink as='h2'>
                <StyledLink to={title}>{title.toUpperCase()}</StyledLink>
            </StyledLink>
            <PreviewContainer>
                {
                    products
                        .filter((_, index) => index < 4)
                        .map((product) => (<ProductCard key={product.id} product={product} />))
                }
            </PreviewContainer>
        </CategoryPreviewContainer>
    );
}


export default CategoryPreview;