class ProductList extends React.Component {
    state = {
        products: [],
    }
    // constructor() {
    //     super() 
    //     // we initialized the initial state for the components with an 
    //     // empty array of products 
    //     this.handleProductUpVote = this.handleProductUpVote.bind(this); 
    //     this.state = {
    //         products: [],
    //     }
    // }
    // we setState for the component by seeding the empty array of 
    // products with Seed.products
    componentDidMount() {
        this.setState({ products: Seed.products });
    }
    handleProductUpVote = (productId) => {
        console.log(productId + ' was upvoted. ');
        // we can make changes to the current state without altering 
        // the initial state that we set on conmponentDidMount 
        const nextProducts = this.state.products.map((product) => {
            if(product.id === productId) {
                
                return Object.assign({}, product, {
                    votes: product.votes + 1,
                })
            } else {
                return product; 
            }
        });
        // here we are setting the state again
        // so this is the new state 
        this.setState({
            products: nextProducts,
        })
    }

    render() {
        const products = this.state.products.sort((a,b) => (
            b.votes - a.votes
        ))
        
        const productComponents = Seed.products.map((product) => (
            <Product
            //these are props we pass down to Product from ProductList
                key={'product-' + product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                url={product.url}
                votes={product.votes}
                submitterAvatarUrl={product.submitterAvatarUrl}
                productImageUrl={product.productImageUrl}
                onVote={this.handleProductUpVote}
            />
        ))
        return (
            <div className='ui unstackable items'>
                {productComponents}
            </div>
        )
    }
}

class Product extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.handleUpvote = this.handleUpvote.bind(this); 
    // }
    handleUpvote = () => {
        this.props.onVote(this.props.id);
    }
    render() {
        return (
            <div className='item'>
                <div className='image'>
                    <img src={this.props.productImageUrl} />
                </div>
                <div className='middle aligned content'>
                    <div className='header'>
                        <a onClick={this.handleUpvote}>
                            <i className='large caret up icon' />
                        </a>
                        {this.props.votes}
                    </div>

                    <div className='description'>
                        <a href={this.props.url}>
                            {this.props.title}
                        </a>
                        <p>
                            {this.props.description}
                        </p>
                    </div>
                    <div className='extra'>
                        <span>Submitted by:</span>
                        <img
                            className='ui avatar image'
                            src={this.props.submitterAvatarUrl}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <ProductList />,
    document.getElementById('content')
)




// there are two ways to declare React componentts 
// 1- ES6 Classes just as above 
// 2- Function components as below 
// function HelloWorld() {
// return <p> Hello, World!</p>
//}

//Javscript Syntax for a react components is as below 
// React.createElement('div', {className: 'ui items'}, 'Hello, World!')
//

// React.createElement('div', {className: 'ui items'},
//     React.createElement('p', null, 'Hello, friend! I am a basic React Com')
// );
// < div className='ui items'> 
//     <p>
//         Hello, friend!
//     </p>
// </div>