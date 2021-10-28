import React, { useState, useEffect } from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';


const Cryptocurrencies = () => {
    const { data: cryptoList, isFetching } = useGetCryptosQuery(); //renaming 'data' to 'cryptoList'
    const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState([])

    useEffect(() => {

    }, [cryptoList, searchTerm])

    if (isFetching) return 'loading...'
    console.log(cryptos)

    return (
        <>
            <div className='search-crypto'>
                <Input placeholder='Search currency' onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className='crypto-image' src={currency.iconUrl} alt='' />}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>

                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies