import './MenuPage.css';
import ManishImage from '../assets/FoodItems/Manish.png';

const menuData = [
    {
        category: 'Starters',
        items: [
            { name: 'Bruschetta', description: 'Grilled bread with tomatoes', price: '$5', image: ManishImage },
            { name: 'Garlic Bread', description: 'Bread with garlic and butter', price: '$4', image: ManishImage },
        ],
    },
    {
        category: 'Main Courses',
        items: [
            { name: 'Margherita Pizza', description: 'Classic pizza with tomatoes and cheese', price: '$10', image: ManishImage },
            { name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, and bacon', price: '$12', image: ManishImage },
        ],
    },
    {
        category: 'Desserts',
        items: [
            { name: 'Tiramisu', description: 'Coffee-flavored Italian dessert', price: '$6', image: ManishImage },
            { name: 'Panna Cotta', description: 'Creamy dessert with berry sauce', price: '$5', image: ManishImage },
        ],
    },
];

function MenuPage() {
    return (
        <div className="menu-page-container">
            <div className="category-list">
                <ul>
                    {menuData.map((category, index) => (
                        <li key={index}>
                            <a href={`#${category.category.toLowerCase().replace(' ', '-')}`}>{category.category}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="menu-page">
                {menuData.map((category, index) => (
                    <div key={index} id={category.category.toLowerCase().replace(' ', '-')} className="menu-category">
                        <h2>{category.category}</h2>
                        <div className="menu-items">
                            {category.items.map((item, idx) => (
                                <div key={idx} className="menu-item">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <p className="price">{item.price}</p>
                                    </div>
                                    <button className="add-to-cart">Add to Cart</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MenuPage;

