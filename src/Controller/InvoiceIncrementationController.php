<?php


namespace App\Controller;


use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;

class InvoiceIncrementationController
{

    public function __invoke(Invoice $data,EntityManagerInterface $manager)
    {
        // TODO: Implement __invoke() method.
        $data->setChrono($data->getChrono() + 1);
        $manager->flush();
        return $data;
    }
}