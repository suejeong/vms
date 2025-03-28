const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 메인 페이지 - 서버 상태 확인용
app.get('/', (req, res) => {
  res.send('Express 서버가 정상적으로 실행 중입니다!');
});

// 모든 고객 정보 가져오기
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (err) {
    console.error('고객 목록 조회 중 오류 발생:', err.message);
    res.status(500).json({ error: '고객 정보를 가져오지 못했습니다.' });
  }
});

// 모든 기업 정보 가져오기
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (err) {
    console.error('기업 목록 조회 중 오류 발생:', err.message);
    res.status(500).json({ error: '기업 정보를 가져오지 못했습니다.' });
  }
});

// 모든 투자 정보 가져오기
app.get('/api/invests', async (req, res) => {
  try {
    const invests = await prisma.invest.findMany();
    res.json(invests);
  } catch (err) {
    console.error('투자 목록 조회 중 오류 발생:', err.message);
    res.status(500).json({ error: '투자 정보를 가져오지 못했습니다.' });
  }
});

// 특정 고객 정보 가져오기
app.get('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customer.findUnique({ where: { id } });
    if (!customer) {
      return res.status(404).json({ error: '해당 고객을 찾을 수 없습니다.' });
    }
    res.json(customer);
  } catch (err) {
    console.error(`고객(ID: ${id}) 조회 중 오류 발생:`, err.message);
    res.status(500).json({ error: '고객 정보를 가져오지 못했습니다.' });
  }
});

// 특정 기업 정보 가져오기
app.get('/api/companies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const company = await prisma.company.findUnique({ where: { id } });
    if (!company) {
      return res.status(404).json({ error: '해당 기업을 찾을 수 없습니다.' });
    }
    res.json(company);
  } catch (err) {
    console.error(`기업(ID: ${id}) 조회 중 오류 발생:`, err.message);
    res.status(500).json({ error: '기업 정보를 가져오지 못했습니다.' });
  }
});

// 특정 투자 정보 가져오기
app.get('/api/invests/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const invest = await prisma.invest.findUnique({ where: { id } });
    if (!invest) {
      return res.status(404).json({ error: '해당 투자를 찾을 수 없습니다.' });
    }
    res.json(invest);
  } catch (err) {
    console.error(`투자(ID: ${id}) 조회 중 오류 발생:`, err.message);
    res.status(500).json({ error: '투자 정보를 가져오지 못했습니다.' });
  }
});

// 새로운 고객 추가하기
app.post('/api/customers', async (req, res) => {
  const { id, password, username } = req.body;
  try {
    const newCustomer = await prisma.customer.create({
      data: { id, password, username },
    });
    res.status(201).json(newCustomer);
  } catch (err) {
    console.error('고객 추가 중 오류 발생:', err.message);
    res.status(500).json({ error: '고객을 추가하지 못했습니다.' });
  }
});

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행됩니당,`);
});
