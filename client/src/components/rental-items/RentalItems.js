import './rental-items.css'
import RentalItem from "../rental-item/RentalItem"
const categories = ["Camping Gear", "Power Tools"]

const RentalItems = ({ items, onItemClick, onLikeClick, onCartClick }) => {

    const getCategoryItems = (category) => items.filter(item => item.category === category)

    return (
        <div id="rental-items-container">
            {categories.map(category =>
                <>
                    <p className="title">{category}</p>
                    <div id="rental-items">
                        {getCategoryItems(category).map(item =>
                            <RentalItem
                                item={item}
                                onItemClick={onItemClick}
                                onLikeClick={onLikeClick}
                                onCartClick={onCartClick}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default RentalItems