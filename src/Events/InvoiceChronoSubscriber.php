<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Invoice;
use App\Repository\InvoiceRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class InvoiceChronoSubscriber implements EventSubscriberInterface
{
    private $repo,$security;

    public function __construct(Security $security, InvoiceRepository $repository)
    {
        $this->repo = $repository;
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        // TODO: Implement getSubscribedEvents() method.
        return [
            KernelEvents::VIEW => ['setChronoForIncoice', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForIncoice(GetResponseForControllerResultEvent $event)
    {
        $result = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if ($result instanceof Invoice && $method === 'POST'){
            $nextChrono = $this->repo->findNextChrono($this->security->getUser());
            $result->setChrono($nextChrono);
            if (empty($result->getSentAt())){
                $result->setSentAt(new \DateTime());
            }
        }
    }
}