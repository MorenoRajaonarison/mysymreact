<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvoiceRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=InvoiceRepository::class)
 * @ApiResource(
 *     subresourceOperations={
 *          "api_customers_invoices_get_subresource"={
 *              "normalization_context"=
 *                  {"groups"={"invoices_subresource"}
 *              }
 *          }
 *     },
 *     itemOperations={"GET","PUT","DELETE","increment"={
 *          "method"="post",
 *          "path"= "/invoices/{id}/increment",
 *          "controller"= "App\Controller\InvoiceIncrementationController",
 *          "swagger_context"={
 *              "summary"="Incremente une facture",
 *              "description"="Incremente le chrono d'une facture"
 *          }
 *     }},
 *     attributes={
 *          "pagination_enabled"=false,
 *          "order": {"amount":"desc"}
 *     },
 *     normalizationContext={
 *          "groups"={"invoices_read"}
 *     },
 *     denormalizationContext={
 *          "disable_type_enforcement"=true}
 *     )
 * @ApiFilter(OrderFilter::class,properties={"amount","sentat"})
 */
class Invoice
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\NotBlank(message="Champ obligatoire")
     * @Assert\Type(type="numeric",message="doit etre un numerique")
     */
    private $amount;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\NotBlank(message="Champ obligatoire")
     * @Assert\DateTime(message="Format non valide, essayé YYYY-MM-DD")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\NotBlank(message="Champ obligatoire")
     * @Assert\Choice({"SENT","PAID","CANCELLED"})
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Customer::class, inversedBy="invoices")
     * @Groups({"invoices_read"})
     * @Assert\NotBlank(message="Champ obligatoire")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"invoices_read","customers_read","invoices_subresource"})
     * @Assert\NotBlank(message="Champ obligatoire")
     * @Assert\Type(type="integer",message="format invalide")
     */
    private $chrono;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount($amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt($sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }

    /**
     * @return User
     * @Groups({"invoices_read","invoices_subresource"})
     */
    public function getUser() :User
    {
        return $this->customer->getUser();
    }
}
